import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

// GET - Buscar pessoa pelo CPF com telefones e endereços
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ cpf: string }> }
) {
  const params = await context.params;
  const { cpf } = params;

  try {
    const { rows } = await db.sql`
      SELECT
        p.id,
        p.nome,
        p.cpf,
        p.parentesco,
        p.mae,
        p.nascimento,
        p.profissao,
        p."isPrincipal",
        p.downloaded,
        p."createdAt",
        COALESCE(json_agg(DISTINCT t.*) FILTER (WHERE t.id IS NOT NULL), '[]') AS telefones,
        COALESCE(json_agg(DISTINCT e.*) FILTER (WHERE e.id IS NOT NULL), '[]') AS enderecos
      FROM people p
      LEFT JOIN telefones t ON p.id = t.person_id
      LEFT JOIN enderecos e ON p.id = e.person_id
      WHERE p.cpf = ${cpf}
      GROUP BY p.id;
    `;
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Pessoa não encontrada' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error: unknown) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Erro ao buscar pessoa' }, { status: 500 });
  }
}

// PUT - Atualizar pessoa pelo CPF com telefones e endereços
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ cpf: string }> }
) {
  const params = await context.params;
  const { cpf } = params;

  try {
    const body = await request.json();
    const { nome, parentesco, mae, nascimento, profissao, isPrincipal, downloaded, telefones, enderecos } = body;

    // Get person_id
    const { rows: [person] } = await db.sql`SELECT id FROM people WHERE cpf = ${cpf};`;
    if (!person) {
      return NextResponse.json({ message: 'Pessoa não encontrada' }, { status: 404 });
    }
    const personId = person.id;

    // Update people table
    await db.sql`
      UPDATE people
      SET
        nome = COALESCE(${nome}, nome),
        parentesco = COALESCE(${parentesco}, parentesco),
        mae = COALESCE(${mae}, mae),
        nascimento = COALESCE(${nascimento}, nascimento),
        profissao = COALESCE(${profissao}, profissao),
        "isPrincipal" = COALESCE(${isPrincipal}, "isPrincipal"),
        downloaded = COALESCE(${downloaded}, downloaded)
      WHERE cpf = ${cpf};
    `;

    // Handle telefones: Delete existing and insert new ones
    await db.sql`DELETE FROM telefones WHERE person_id = ${personId};`;
    if (telefones && Array.isArray(telefones) && telefones.length > 0) {
      for (const tel of telefones) {
        await db.sql`
          INSERT INTO telefones (person_id, numero, tipo)
          VALUES (${personId}, ${tel.numero}, ${tel.tipo || null});
        `;
      }
    }

    // Handle enderecos: Delete existing and insert new ones
    await db.sql`DELETE FROM enderecos WHERE person_id = ${personId};`;
    if (enderecos && Array.isArray(enderecos) && enderecos.length > 0) {
      for (const end of enderecos) {
        await db.sql`
          INSERT INTO enderecos (person_id, logradouro, numero, bairro, cidade, uf, cep)
          VALUES (${personId}, ${end.logradouro}, ${end.numero || null}, ${end.bairro || null}, ${end.cidade}, ${end.uf}, ${end.cep || null});
        `;
      }
    }

    // Return the updated person with their related data
    const { rows: [fullPerson] } = await db.sql`
      SELECT
        p.id,
        p.nome,
        p.cpf,
        p.parentesco,
        p.mae,
        p.nascimento,
        p.profissao,
        p."isPrincipal",
        p.downloaded,
        p."createdAt",
        COALESCE(json_agg(DISTINCT t.*) FILTER (WHERE t.id IS NOT NULL), '[]') AS telefones,
        COALESCE(json_agg(DISTINCT e.*) FILTER (WHERE e.id IS NOT NULL), '[]') AS enderecos
      FROM people p
      LEFT JOIN telefones t ON p.id = t.person_id
      LEFT JOIN enderecos e ON p.id = e.person_id
      WHERE p.id = ${personId}
      GROUP BY p.id;
    `;

    return NextResponse.json(fullPerson);
  } catch (error: unknown) {
    console.error('PUT Error:', error);
    return NextResponse.json({ message: 'Erro ao atualizar pessoa' }, { status: 500 });
  }
}

// DELETE - Deletar pessoa pelo CPF (requere senha)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ cpf: string }> }
) {
  const params = await context.params;
  const { cpf } = params;

  try {
    const body = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json({ message: 'Senha de administrador não configurada' }, { status: 500 });
    }

    if (!body.password || body.password !== adminPassword) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }

    const result = await db.sql`DELETE FROM people WHERE cpf = ${cpf} RETURNING *;`;
    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Pessoa não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Pessoa deletada com sucesso' });
  } catch (error: unknown) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ message: 'Erro ao deletar pessoa' }, { status: 500 });
  }
}
