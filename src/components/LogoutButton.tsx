'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded px-3 py-2 disabled:opacity-60"
    >
      {loading ? '正在登出...' : '登出'}
    </button>
  );
}