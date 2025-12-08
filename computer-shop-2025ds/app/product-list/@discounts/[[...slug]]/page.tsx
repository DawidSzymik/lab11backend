import Link from "next/link";
import Image from "next/image";
import { getAllProductsAlphabetically } from '@/lib/products';

export default async function DiscountsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  
  // Pokazuj promocje TYLKO na:
  // - głównej stronie (/product-list)
  // - stronie kategorii (/product-list/dysk)
  // NIE pokazuj na:
  // - stronie produktu (/product-list/123 lub /product-list/dysk/123)
  
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

  const allProducts = getAllProductsAlphabetically();
  
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
          const originalPrice = product.price;
          const discountedPrice = originalPrice * 0.9;
          
          return (
            <Link
              key={product.id}
              href={`/product-list/${product.id}`}
              className="bg-white rounded-lg p-6 border-2 border-red-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-bold">
                  -10%
                </div>
                <div className="flex justify-center mb-4 bg-gray-50 rounded-lg p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 line-through text-lg">
                  {originalPrice.toFixed(2)} zł
                </span>
                <span className="text-2xl font-bold text-red-600">
                  {discountedPrice.toFixed(2)} zł
                </span>
              </div>
              
              <p className="text-sm text-gray-600">Typ: {product.type}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}