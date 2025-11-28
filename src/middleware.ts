import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 保护欢迎页
  if (pathname.startsWith('/welcome')) {
    //const token = req.cookies.get('auth_token')?.value;
    //if (!token) {
    const username = req.cookies.get('username')?.value;
    if (!username) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const res = NextResponse.next();
  res.headers.set('x-app', 'k-life-client');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};