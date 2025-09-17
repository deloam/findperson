import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

// GET - Buscar pessoa pelo CPF
export async function GET(
  request: NextRequest,
  { params }: { params: { cpf: string } }
) {
  const { cpf } = params;
  try {
    const { rows } = await db.sql`SELECT * FROM people WHERE cpf = ${cpf};`;
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Pessoa não encontrada' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error: unknown) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Erro ao buscar pessoa' }, { status: 500 });
  }
}

// PUT - Atualizar pessoa pelo CPF
export async function PUT(
  request: NextRequest,
  { params }: { params: { cpf: string } }
) {
  const { cpf } = params;
  try {
    const body = await request.json();

    // Validar downloaded se presente
    if ('downloaded' in body && typeof body.downloaded !== 'boolean') {
      return NextResponse.json({ message: "'downloaded' inválido" }, { status: 400 });
    }

    const result = await db.sql`
      UPDATE people
      SET 
        nome = COALESCE(${body.nome}, nome),
        parentesco = COALESCE(${body.parentesco}, parentesco),
        mae = COALESCE(${body.mae}, mae),
        nascimento = COALESCE(${body.nascimento}, nascimento),
        profissao = COALESCE(${body.profissao}, profissao),
        "isPrincipal" = COALESCE(${body.isPrincipal}, "isPrincipal"),
        downloaded = COALESCE(${body.downloaded}, downloaded)
      WHERE cpf = ${cpf}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Pessoa não encontrada' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    console.error('PUT Error:', error);
    return NextResponse.json({ message: 'Erro ao atualizar pessoa' }, { status: 500 });
  }
}

// DELETE - Deletar pessoa pelo CPF (requere senha)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { cpf: string } }
) {
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