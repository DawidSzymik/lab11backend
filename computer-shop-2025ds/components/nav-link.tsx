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
      className={isActive ? "active" : ""}
    >
      {children}
    </Link>
  );
}