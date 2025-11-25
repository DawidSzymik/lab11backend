import type { Metadata } from "next";
import "./global.css";
import MainHeader from "@/components/main-header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Computer Shop",
  description: "NextJS Labs of BackEnd Programming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        <MainHeader />
        <main style={{ flexGrow: 1, maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem', width: '100%' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}