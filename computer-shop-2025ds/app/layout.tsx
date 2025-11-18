import type { Metadata } from "next";
import './global.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Sklep Komputerowy 2025DS",
  description: "Sklep komputerowy stworzony przez Dawid Szymik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="page">
          <header id="main-header">
            <div id="logo">
              <Link href="/">Sklep Komputerowy</Link>
            </div>
            <nav>
              <ul>
                <Link href="/">Strona główna</Link>
                <Link href="/product-list">Produkty</Link>
                <Link href="/basket">Koszyk</Link>
                <Link href="/order-history">Historia</Link>
                <Link href="/about">O sklepie</Link>
              </ul>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}