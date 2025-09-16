import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { cpf: string } }) {
  try {
    const { cpf } = params;
    const { downloaded } = await request.json();

    if (typeof downloaded !== 'boolean') {
        return NextResponse.json({ message: "Invalid 'downloaded' status" }, { status: 400 });
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

    return NextResponse.json(result.rows[0]);

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Failed to update person' }, { status: 500 });
  }
}
