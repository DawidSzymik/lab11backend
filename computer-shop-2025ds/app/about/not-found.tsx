import Link from 'next/link';

export default function AboutNotFound() {
  return (
    <main className="not-found">
      <h1>Nie znaleziono strony o sklepie</h1>
      <p>Strona, której szukasz w sekcji "O sklepie", nie istnieje.</p>
      <p><Link href="/about">Wróć do strony o sklepie</Link></p>
    </main>
  );
}