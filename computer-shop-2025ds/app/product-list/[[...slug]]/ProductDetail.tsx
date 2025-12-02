import Link from "next/link";
import Image from "next/image";
import type { Product } from '@/lib/products';

export default function ProductDetail({ 
  product, 
  backLink, 
  backText 
}: { 
  product: Product; 
  backLink: string; 
  backText: string 
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <Link href={backLink} className="inline-block mb-8 text-blue-900 font-medium hover:underline">
        ← {backText}
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="max-w-full h-auto rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-blue-900">{product.name}</h1>
            <p className="text-gray-600 text-lg">Typ: {product.type}</p>
            
            <p className="text-gray-700 leading-relaxed my-4">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 mt-4 pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">ID produktu:</span>
                <span className="text-gray-800">{product.id}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Kod produktu:</span>
                <span className="text-gray-800">{product.code}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Kategoria:</span>
                <span className="text-gray-800">{product.type}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Stan magazynowy:</span>
                <span className="text-gray-800">{product.amount} szt.</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold text-gray-600">Data dodania:</span>
                <span className="text-gray-800">
                  {new Date(product.date).toLocaleDateString('pl-PL')}
                </span>
              </div>
            </div>

            <div className="text-4xl font-bold text-green-600 mt-4">
              {product.price.toFixed(2)} zł
            </div>

            <div className={`inline-block px-4 py-2 rounded-full font-semibold text-sm mt-4 w-fit ${
              product.amount > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.amount > 0 ? '✓ Dostępny' : '✗ Niedostępny'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}