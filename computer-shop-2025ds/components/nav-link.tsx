"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  
  const isActive = href === "/" 
    ? path === href 
    : path.startsWith(href);
  
  return (
    <Link
      href={href}
      className={`text-white transition-colors ${
        isActive 
          ? 'text-blue-300 font-bold' 
          : 'hover:text-blue-300'
      }`}
    >
      {children}
    </Link>
  );
}