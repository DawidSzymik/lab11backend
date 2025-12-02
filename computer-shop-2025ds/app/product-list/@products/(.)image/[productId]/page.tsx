"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProductById } from '@/lib/products';
import { notFound } from "next/navigation";
import { use } from "react";

export default function InterceptedImagePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const router = useRouter();
  const { productId } = use(params);
  
  const product = getProductById(parseInt(productId));

  if (!product) {
    notFound();
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <div 
        className="relative bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold bg-white rounded-full w-10 h-10 flex items-center justify-center"
        >
          ×
        </button>
        
        <h2 className="text-2xl font-bold mb-4 pr-8">{product.name}</h2>
        
        <Image
          src={product.image}
          alt={product.name}
          width={800}
          height={800}
          className="max-w-full h-auto rounded-lg"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}