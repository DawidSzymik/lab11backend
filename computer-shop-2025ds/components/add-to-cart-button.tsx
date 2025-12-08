'use client';

import { useState } from 'react';
import { addToCart } from '@/lib/actions/cart';
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ 
  userId, 
  productCode, 
  inStock 
}: { 
  userId: string; 
  productCode: string; 
  inStock: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await addToCart(userId, productCode, 1);
      setSuccess(true);
      
      // Pokaż komunikat przez 2 sekundy, potem przekieruj
      setTimeout(() => {
        router.push('/basket');
      }, 2000);
    } catch (error) {
      console.error('Błąd:', error);
      alert('Nie udało się dodać produktu do koszyka');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full py-4 bg-green-500 text-white text-center rounded-lg font-bold text-lg flex items-center justify-center gap-2">
        <span className="text-2xl">✓</span>
        Produkt dodany do koszyka!
      </div>
    );
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={!inStock || loading}
      className={`w-full py-4 rounded-lg font-bold text-lg transition ${
        inStock && !loading
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      {loading ? 'Dodawanie...' : inStock ? '🛒 Dodaj do koszyka' : 'Niedostępny'}
    </button>
  );
}