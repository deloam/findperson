import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

// GET → lista todos
export async function GET() {
  try {
    const { rows } = await db.sql`
      SELECT * FROM people ORDER BY "createdAt" DESC;
    `;
    return NextResponse.json(rows); // array
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to fetch people' }, { status: 500 });
  }
}

// POST → cria novo
export async function POST(request: NextRequest) {
  try {
    const newPerson = await request.json();
    const { nome, cpf, parentesco, mae, nascimento, profissao, isPrincipal } = newPerson;

    if (!nome || !cpf || !parentesco) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.sql`
      INSERT INTO people (nome, cpf, parentesco, mae, nascimento, profissao, "isPrincipal", downloaded)
      VALUES (${nome}, ${cpf}, ${parentesco}, ${mae}, ${nascimento}, ${profissao}, ${isPrincipal || false}, false)
      RETURNING *;
    `;

    return NextResponse.json(result.rows[0], { status: 201 }); // objeto
  } catch (error: any) {
    console.error('Database Error:', error);
    if (error.message.includes('duplicate key value violates unique constraint')) {
      return NextResponse.json({ message: 'CPF already exists' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Failed to create person' }, { status: 500 });
  }
}
