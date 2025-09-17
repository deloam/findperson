import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

// GET - Listar todas as pessoas, ordenando principal primeiro e depois por criação
export async function GET() {
  try {
    const { rows } = await db.sql`
      SELECT * FROM people
      ORDER BY "isPrincipal" DESC, "createdAt" DESC;
    `;
    return NextResponse.json(rows);
  } catch (error: unknown) {
    console.error('GET /api/cards Error:', error);
    return NextResponse.json({ message: 'Erro ao buscar pessoas' }, { status: 500 });
  }
}

// POST - Adicionar nova pessoa
export async function POST(request: NextRequest) {
  try {
    const newPerson = await request.json();
    const { nome, cpf, parentesco, mae, nascimento, profissao, isPrincipal } = newPerson;

    // Validação básica
    if (!nome || !cpf || !parentesco) {
      return NextResponse.json({ message: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const result = await db.sql`
      INSERT INTO people (nome, cpf, parentesco, mae, nascimento, profissao, "isPrincipal", downloaded)
      VALUES (${nome}, ${cpf}, ${parentesco}, ${mae || null}, ${nascimento || null}, ${profissao || null}, ${isPrincipal || false}, false)
      RETURNING *;
    `;

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    console.error('POST /api/cards Error:', error);

    // Verifica duplicidade de CPF
    if (error instanceof Error && error.message.includes('duplicate key value violates unique constraint')) {
      return NextResponse.json({ message: 'CPF já existe' }, { status: 409 });
    }

    return NextResponse.json({ message: 'Erro ao criar pessoa' }, { status: 500 });
  }
}
