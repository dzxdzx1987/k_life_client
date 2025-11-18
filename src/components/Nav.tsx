'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: '/', label: '首页' },
    { href: '/api/health', label: '健康检查' },
    { href: '/login', label: '登录' },
    { href: '/welcome', label: '欢迎' },
  ];

  return (
    <nav className="flex gap-4 p-4 border-b">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={pathname === href ? 'font-semibold text-blue-600' : 'text-gray-600'}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}