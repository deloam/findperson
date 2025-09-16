import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// IMPORTANT: This should be in an environment variable
const SECRET_KEY = process.env.JWT_SECRET || 'your-super-secret-key-that-is-at-least-32-characters-long';

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value;

  // Redirect to login if there is no token
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify the token
  try {
    const secret = new TextEncoder().encode(SECRET_KEY);
    await jwtVerify(sessionToken, secret);
    // If verification is successful, let the request proceed
    return NextResponse.next();
  } catch (error) {
    // If verification fails, redirect to login
    console.error("JWT Verification Error:", error);
    const response = NextResponse.redirect(new URL('/login', request.url));
    // Clear the invalid cookie
    response.cookies.delete('session_token');
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/', // Protect only the root page
};
