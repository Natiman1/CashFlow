'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

const NavLink = ({ href, children, className = '', ...props }: { href: string; children: React.ReactNode; className?: string } & React.ComponentProps<typeof Link>) => {
  const pathname = usePathname();

  // Track hash for anchor links (e.g. href="#features") because `usePathname()` does not include the fragment
  const [hash, setHash] = React.useState<string>('');
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setHash(window.location.hash || '');
    const onNavHash = (e: Event) => {
      // support both native hashchange (no detail) and custom events (detail holds href)
      const detail = (e as CustomEvent)?.detail;
      if (typeof detail === 'string') setHash(detail || '');
      else update();
    };

    update();
    window.addEventListener('hashchange', onNavHash);
    window.addEventListener('popstate', onNavHash);
    window.addEventListener('nav:hash', onNavHash as EventListener);
    return () => {
      window.removeEventListener('hashchange', onNavHash);
      window.removeEventListener('popstate', onNavHash);
      window.removeEventListener('nav:hash', onNavHash as EventListener);
    };
  }, []);

  let isActive = false;
  if (href && href.startsWith('#')) {
    isActive = hash === href;
  } else {
    isActive = pathname === href;
  }

  // Preserve any user-provided onClick while updating hash state for client-side anchor navigation
  const { onClick, ...linkProps } = props as { onClick?: React.MouseEventHandler<HTMLAnchorElement> } & typeof props;
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (href && href.startsWith('#')) {
      // update local state and broadcast to other NavLink instances so only the current link is active
      setHash(href);
      try {
        window.dispatchEvent(new CustomEvent('nav:hash', { detail: href }));
      } catch (err) {
        // ignore
      }
      // allow the browser/Next to handle scrolling/navigation
    }
    if (onClick) onClick(e);
  };

  const activeClassName = isActive
    ? 'text-gray-900 border-b-4 border-primary-500 py-2'
    : 'border-b-4 border-white hover:border-primary-500 py-2 hover:text-gray-900';

  return (
    <Link href={href} className={`${activeClassName} ${className}`} onClick={handleClick} {...linkProps}>
      {children}
    </Link>
  );
}

export default NavLink