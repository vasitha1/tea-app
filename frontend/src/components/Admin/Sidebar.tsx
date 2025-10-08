'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/categories', label: 'Categories' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/reviews', label: 'Reviews' },
    { href: '/admin/users', label: 'Users' },
    { href: '/admin/faqs', label: 'FAQs' },
  ];

  return (
    <div className="w-64 bg-emerald-800 text-white p-4 space-y-6">
      <div className="text-2xl font-bold text-white">Earthlixir Admin</div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <span className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${pathname === item.href ? 'bg-emerald-700 text-white shadow-md' : 'hover:bg-emerald-700 hover:text-white text-emerald-100'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
