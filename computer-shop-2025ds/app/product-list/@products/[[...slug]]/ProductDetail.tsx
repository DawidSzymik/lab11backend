import Link from "next/link";
import { auth } from "@/lib/auth";
import AddToCartButton from "@/components/add-to-cart-button";

type ProductWithCategory = {
  id: number;
  code: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  createdAt: Date;
  category: {
    id: number;
    name: string;
  };
};

export default async function ProductDetail({ 
  product, 
  backLink, 
  backText 
}: { 
  product: ProductWithCategory;
  backLink: string; 
  backText: string 
}) {
  const session = await auth();

  return (
    <div className="max-w-5xl mx-auto">
      <Link href={backLink} className="inline-block mb-8 text-blue-900 font-medium hover:underline">
        ← {backText}
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href={`/product-list/image/${product.id}`}>
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 cursor-pointer hover:bg-gray-200 transition">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxWidth: '400px', maxHeight: '400px' }}
                />
              )}
            </div>
          </Link>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-blue-900">{product.name}</h1>
            <p className="text-gray-600 text-lg">Kategoria: {product.category.name}</p>
            
            <p className="text-gray-700 leading-relaxed my-4">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 mt-4 pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Kod produktu:</span>
                <span className="text-gray-800">{product.code}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Kategoria:</span>
                <span className="text-gray-800">{product.category.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Stan magazynowy:</span>
                <span className="text-gray-800">{product.stock} szt.</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Data dodania:</span>
                <span className="text-gray-800">
                  {new Date(product.createdAt).toLocaleDateString('pl-PL')}
                </span>
              </div>
            </div>

            <div className="text-4xl font-bold text-green-600 mt-4">
              {Number(product.price).toFixed(2)} zł
            </div>

            <div className={`inline-block px-4 py-2 rounded-full font-semibold text-sm mt-4 w-fit ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? '✓ Dostępny' : '✗ Niedostępny'}
            </div>

            {/* Przycisk dodaj do koszyka */}
            {session?.user?.id ? (
              <AddToCartButton 
                userId={session.user.id}
                productCode={product.code}
                inStock={product.stock > 0}
              />
            ) : (
              <Link 
                href="/basket"
                className="block w-full py-4 bg-yellow-500 text-white text-center rounded-lg font-bold text-lg hover:bg-yellow-600 transition"
              >
                🔐 Zaloguj się, aby kupić
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}