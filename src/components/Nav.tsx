'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoutButton from '@/components/LogoutButton';

export default function Nav() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
      const hasUsername = document.cookie
        .split(';')
        .some((c) => c.trim().startsWith('username='));
      setIsLoggedIn(hasUsername);
    }, [pathname]);
  const links = [
    { href: '/', label: '首页' },
    { href: '/api/health', label: '健康检查' },
    { href: '/welcome', label: '欢迎' },
  ];

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      {/* 左侧链接组 */}
      <div className="flex gap-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? 'font-semibold text-blue-600' : 'text-gray-600'}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* 右上角登录/登出 */}
      <div className="flex items-center">
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <Link
            href="/login"
            className={pathname === '/login' ? 'font-semibold text-blue-600' : 'text-gray-600'}
          >
            登录
          </Link>
        )}
      </div>
    </nav>
  );
}