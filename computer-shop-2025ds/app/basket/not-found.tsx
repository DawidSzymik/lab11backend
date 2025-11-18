import Link from 'next/link';

export default function BasketNotFound() {
  return (
    <main className="not-found">
      <h1>Nie znaleziono strony koszyka</h1>
      <p>Strona, której szukasz w sekcji koszyka, nie istnieje.</p>
      <p><Link href="/basket">Wróć do koszyka</Link></p>
    </main>
  );
}