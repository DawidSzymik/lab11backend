import Link from 'next/link';

export default function ProductListNotFound() {
  return (
    <main className="not-found">
      <h1>Nie znaleziono strony produktów</h1>
      <p>Strona, której szukasz w sekcji produktów, nie istnieje.</p>
      <p><Link href="/product-list">Wróć do listy produktów</Link></p>
    </main>
  );
}