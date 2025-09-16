import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await db.sql`SELECT * FROM people ORDER BY "createdAt" DESC;`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to fetch people' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPerson = await request.json();
    const { nome, cpf, parentesco, mae, nascimento, profissao, isPrincipal } = newPerson;

    // Basic validation
    if (!nome || !cpf || !parentesco) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.sql`
      INSERT INTO people (nome, cpf, parentesco, mae, nascimento, profissao, "isPrincipal", downloaded)
      VALUES (${nome}, ${cpf}, ${parentesco}, ${mae}, ${nascimento}, ${profissao}, ${isPrincipal || false}, false)
      RETURNING *;
    `;

    return NextResponse.json(result.rows[0], { status: 201 });

  } catch (error) {
    console.error('Database Error:', error);
    // Handle potential unique constraint violation for CPF
    if (error.message.includes('duplicate key value violates unique constraint')) {
        return NextResponse.json({ message: 'CPF already exists' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Failed to create person' }, { status: 500 });
  }
}
