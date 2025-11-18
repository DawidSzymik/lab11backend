import type { Metadata } from "next";
import './global.css';

export const metadata: Metadata = {
  title: "Sklep Komputerowy 2025DS",
  description: "Sklep komputerowy stworzony przez Imie Nazwisko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}