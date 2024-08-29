
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();

}

export const config = {
  matcher: ['/', '/home', '/protected-page', '/login', '/signup'], 
};
