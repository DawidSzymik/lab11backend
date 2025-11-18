import Link from 'next/link';

export default function OrderHistoryNotFound() {
  return (
    <main className="not-found">
      <h1>Nie znaleziono strony historii zakupów</h1>
      <p>Strona, której szukasz w sekcji historii, nie istnieje.</p>
      <p><Link href="/order-history">Wróć do historii zakupów</Link></p>
    </main>
  );
}