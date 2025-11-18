import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json().catch(() => ({ username: '', password: '' }));

  if (!username || !password) {
    return NextResponse.json({ ok: false, message: '用户名或密码不能为空' }, { status: 400 });
  }

  /*if (username === 'admin' && password === '123456') {
    const res = NextResponse.json({ ok: true, message: '登录成功' }, { status: 200 });
    res.cookies.set('auth_token', 'demo-token', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    res.cookies.set('username', username, {
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });
    return res;
  }*/

  return NextResponse.json({ ok: false, message: '用户名或密码错误' }, { status: 401 });
}