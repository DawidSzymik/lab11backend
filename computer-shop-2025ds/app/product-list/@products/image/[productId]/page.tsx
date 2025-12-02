import Image from "next/image";
import Link from "next/link";
import { getProductById } from '@/lib/products';
import { notFound } from "next/navigation";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getProductById(parseInt(productId));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <Link 
          href={`/product-list/${productId}`}
          className="inline-block mb-6 text-blue-900 font-medium hover:underline"
        >
          ← Powrót do produktu
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{product.name}</h1>
          
          <div className="flex justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}