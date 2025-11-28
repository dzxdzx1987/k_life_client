import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function WelcomePage() {
  const cookieStore = await cookies();
  /*const token = cookieStore.get('auth_token')?.value;
  if (!token) {
    redirect('/login?from=/welcome');
  }*/

  const username = cookieStore.get('username')?.value;
  console.log(username);
  if (!username) {
    redirect('/login?from=/welcome');
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">欢迎{username ? `，${username}` : ''}！</h1>
      <p className="text-gray-700">你已成功登录。</p>
      {/* 登出按钮 */}
      {/*<LogoutButton />*/}
    </div>
  );
}