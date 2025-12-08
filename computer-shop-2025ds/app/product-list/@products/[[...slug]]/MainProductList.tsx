import Link from "next/link";
import { getAllProducts } from '@/lib/db-products';

export default async function MainProductList() {
  const allProducts = await getAllProducts();
  
  // Pobierz unikalne kategorie
  const categories = Array.from(new Set(allProducts.map(p => p.category.name)));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Lista produktów</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Przeglądaj według kategorii:</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <Link
              key={category}
              href={`/product-list/${category}`}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition-all hover:-translate-y-1"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      <p className="mb-4 text-gray-600">Wyświetlanych produktów: {allProducts.length}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map(product => (
          <Link 
            key={product.id} 
            href={`/product-list/${product.id}`}
            className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-center mb-4 bg-gray-50 rounded-lg p-4">
              {product.imageUrl && (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="object-contain"
                  style={{ width: '200px', height: '200px' }}
                />
              )}
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">Kategoria: {product.category.name}</p>
            <p className="text-2xl font-bold text-green-600 mb-2">{Number(product.price).toFixed(2)} zł</p>
            <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
              Stan: {product.stock > 0 ? `${product.stock} szt.` : 'Brak na stanie'}
            </p>
            <p className="text-gray-700 mt-3 text-sm line-clamp-2">{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}