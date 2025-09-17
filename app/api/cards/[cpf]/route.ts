import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  cpf: string;
}

// GET → retorna 1 objeto
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { cpf } = params;

    const result = await db.sql`
      SELECT * FROM people WHERE cpf = ${cpf};
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]); // objeto
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to fetch person' }, { status: 500 });
  }
}

// PUT → atualiza e retorna 1 objeto
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { cpf } = params;
    const { downloaded } = await request.json();

    if (typeof downloaded !== 'boolean') {
      return NextResponse.json(
        { message: "Invalid 'downloaded' status" },
        { status: 400 }
      );
    }

    const result = await db.sql`
      UPDATE people
      SET downloaded = ${downloaded}
      WHERE cpf = ${cpf}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]); // objeto
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to update person' }, { status: 500 });
  }
}

// DELETE → remove e retorna 1 objeto (ou mensagem)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { cpf } = params;
    const body = await request.json();
    const { password } = body;

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }

    const result = await db.sql`
      DELETE FROM people WHERE cpf = ${cpf} RETURNING *;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]); // objeto deletado
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to delete person' }, { status: 500 });
  }
}

