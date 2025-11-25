"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProductsAlphabetically, getAllProductsByNewest } from '@/lib/products';

export default function ProductList() {
  const [sortBy, setSortBy] = useState<"alphabetical" | "newest">("alphabetical");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  let displayedProducts = sortBy === "alphabetical" 
    ? getAllProductsAlphabetically()
    : getAllProductsByNewest();

  if (showAvailableOnly) {
    displayedProducts = displayedProducts.filter(p => p.amount > 0);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Lista produktów</h2>
      
      <div className="flex gap-8 mb-8 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="font-medium">Sortuj:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "alphabetical" | "newest")}
            className="px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer"
          >
            <option value="alphabetical">Alfabetycznie</option>
            <option value="newest">Najnowsze</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="available"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
            className="cursor-pointer"
          />
          <label htmlFor="available" className="font-medium cursor-pointer">Tylko dostępne</label>
        </div>
      </div>

      <p className="mb-4 text-gray-600">Wyświetlanych produktów: {displayedProducts.length}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map(product => (
          <Link 
            key={product.id} 
            href={`/product-list/${product.id}`}
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