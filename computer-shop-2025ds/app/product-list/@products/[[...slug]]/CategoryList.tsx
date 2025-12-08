import Link from "next/link";
import Image from "next/image";
import type { Product } from '@/lib/products';

export default function CategoryList({ 
  category, 
  products 
}: { 
  category: string; 
  products: Product[] 
}) {
  return (
    <div>
      <Link href="/product-list" className="inline-block mb-8 text-blue-900 font-medium hover:underline">
        ← Powrót do wszystkich produktów
      </Link>

      <h2 className="text-3xl font-bold mb-6 text-blue-900">
        Kategoria: {category}
      </h2>
      
      <p className="mb-4 text-gray-600">Produktów w kategorii: {products.length}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Link 
            key={product.id} 
            href={`/product-list/${category}/${product.id}`}
            className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-center mb-4 bg-gray-50 rounded-lg p-4">
              <Image 
                src={product.image} 
                alt={product.name}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">Typ: {product.type}</p>
            <p className="text-2xl font-bold text-green-600 mb-2">{product.price.toFixed(2)} zł</p>
            <p className={`text-sm font-medium ${product.amount > 0 ? 'text-green-700' : 'text-red-700'}`}>
              Stan: {product.amount > 0 ? `${product.amount} szt.` : 'Brak na stanie'}
            </p>
            <p className="text-gray-700 mt-3 text-sm line-clamp-2">{product.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}