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
      <body className="flex flex-col min-h-screen">
        <MainHeader />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}