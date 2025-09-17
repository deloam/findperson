import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// IMPORTANT: These should be in environment variables
const SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key-that-is-at-least-32-characters-long';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  if (password === ADMIN_PASSWORD) {
    // Password is correct, create a JWT
    const secret = new TextEncoder().encode(SECRET_KEY);

    const token = await new SignJWT({ user: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // Token expires in 1 hour
      .sign(secret);

    // Set the token in an HTTP-only cookie
    (await
      // Set the token in an HTTP-only cookie
      cookies()).set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour in seconds
      path: '/',
    });

    return NextResponse.json({ message: 'Login successful' });
  } else {
    // Password is incorrect
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }
}
