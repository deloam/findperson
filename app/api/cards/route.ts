import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

// GET - Listar todas as pessoas com seus telefones e endereços
export async function GET() {
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
      GROUP BY p.id
      ORDER BY p."isPrincipal" DESC, p."createdAt" DESC;
    `;
    return NextResponse.json(rows);
  } catch (error: unknown) {
    console.error('GET /api/cards Error:', error);
    return NextResponse.json({ message: 'Erro ao buscar pessoas' }, { status: 500 });
  }
}

// POST - Adicionar nova pessoa com telefones e endereços
export async function POST(request: NextRequest) {
  try {
    const newPerson = await request.json();
    const { nome, cpf, parentesco, mae, nascimento, profissao, isPrincipal, telefones, enderecos } = newPerson;

    // Validação básica
    if (!nome || !cpf || !parentesco) {
      return NextResponse.json({ message: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    // Inserir pessoa na tabela people
    const { rows: [insertedPerson] } = await db.sql`
      INSERT INTO people (nome, cpf, parentesco, mae, nascimento, profissao, "isPrincipal", downloaded)
      VALUES (${nome}, ${cpf}, ${parentesco}, ${mae || null}, ${nascimento || null}, ${profissao || null}, ${isPrincipal || false}, false)
      RETURNING id;
    `;
    const personId = insertedPerson.id;

    // Inserir telefones
    if (telefones && Array.isArray(telefones) && telefones.length > 0) {
      for (const tel of telefones) {
        await db.sql`
          INSERT INTO telefones (person_id, numero, tipo)
          VALUES (${personId}, ${tel.numero}, ${tel.tipo || null});
        `;
      }
    }

    // Inserir endereços
    if (enderecos && Array.isArray(enderecos) && enderecos.length > 0) {
      for (const end of enderecos) {
        await db.sql`
          INSERT INTO enderecos (person_id, logradouro, numero, bairro, cidade, uf, cep)
          VALUES (${personId}, ${end.logradouro}, ${end.numero || null}, ${end.bairro || null}, ${end.cidade}, ${end.uf}, ${end.cep || null});
        `;
      }
    }

    // Retornar a pessoa recém-criada com seus dados relacionados
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

    return NextResponse.json(fullPerson, { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/cards Error:', error);

    if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
      return NextResponse.json({ message: 'CPF já existe' }, { status: 409 });
    }

    return NextResponse.json({ message: 'Erro ao criar pessoa' }, { status: 500 });
  }
}