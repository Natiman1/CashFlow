'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const NavLink = ({ href, children, className = '', ...props }: { href: string; children: React.ReactNode; className?: string } & React.ComponentProps<typeof Link>) => {
  const pathname = usePathname();

  const isActive = pathname === href; // Replace '/some-path' with the actual path you want to check

const activeClassName = isActive ? 'text-gray-900 border-b-4 border-primary-500 py-2' : 'border-b-4 border-white hover:border-primary-500 py-2 hover:text-gray-900';

  return (
    <Link href={href} className={`${activeClassName} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export default NavLink