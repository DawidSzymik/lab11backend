import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex justify-center items-center min-h-[60vh] p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-8xl font-bold text-blue-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          Nie znaleziono
        </h2>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          Kategoria lub produkt o podanych parametrach nie istnieje.
        </p>
        <Link 
          href="/product-list" 
          className="inline-block mt-8 px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all hover:-translate-y-1"
        >
          ← Powrót do listy produktów
        </Link>
      </div>
    </div>
  );
}