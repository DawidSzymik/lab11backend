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
  
  return (
    <Link
      href={href}
      className={`hover:text-blue-300 transition ${
        path.startsWith(href) && href !== "/" 
          ? "text-blue-300 font-bold" 
          : path === href 
          ? "text-blue-300 font-bold" 
          : ""
      }`}
    >
      {children}
    </Link>
  );
}