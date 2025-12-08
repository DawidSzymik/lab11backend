import Link from "next/link";
import { getAllProducts } from '@/lib/db-products';

export default async function DiscountsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  
  // Pokazuj promocje TYLKO na:
  // - głównej stronie (/product-list)
  // - stronie kategorii (/product-list/procesor)
  // NIE pokazuj na:
  // - stronie produktu (/product-list/123 lub /product-list/procesor/123)
  
  if (slug && slug.length > 0) {
    // Jeśli slug[0] jest liczbą = strona produktu
    const maybeId = parseInt(slug[0]);
    if (!isNaN(maybeId)) {
      return null; // Strona produktu - ukryj promocje
    }
    
    // Jeśli slug ma 2 elementy = strona produktu w kategorii
    if (slug.length === 2) {
      return null; // Strona produktu w kategorii - ukryj promocje
    }
    
    // W przeciwnym razie (slug.length === 1 i nie jest liczbą) = strona kategorii
    // Pokazuj promocje
  }

  const allProducts = await getAllProducts();
  
  // Wybierz 3 losowe produkty
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  const randomProducts = shuffled.slice(0, 3);

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border-2 border-red-200">
      <h2 className="text-3xl font-bold text-red-600 mb-6 flex items-center gap-3">
        🔥 PROMOCJE - 10% TANIEJ!
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {randomProducts.map(product => {
          const discountedPrice = Number(product.price) * 0.9;
          
          return (
            <Link 
              key={product.id} 
              href={`/product-list/${product.id}`}
              className="bg-white border-2 border-red-300 rounded-lg p-4 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4 bg-gray-50 rounded-lg p-4 relative">
                <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -10%
                </div>
                {product.imageUrl && (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="object-contain"
                    style={{ width: '150px', height: '150px' }}
                  />
                )}
              </div>
              
              <h3 className="text-lg font-bold text-blue-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">Kategoria: {product.category.name}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg text-gray-400 line-through">
                  {Number(product.price).toFixed(2)} zł
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {discountedPrice.toFixed(2)} zł
                </span>
              </div>
              
              <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                {product.stock > 0 ? `✓ Dostępny (${product.stock} szt.)` : '✗ Brak na stanie'}
              </p>
            </Link>
          );
        })}
      </div>
      
      <p className="text-center mt-6 text-gray-600 text-sm">
        *Promocja obowiązuje do wyczerpania zapasów
      </p>
    </div>
  );
}