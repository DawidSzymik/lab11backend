'use client';

import { useState } from 'react';
import { removeFromCart, updateCartItemQuantity } from '@/lib/actions/cart';
import { useRouter } from 'next/navigation';

export default function CartItemControls({
  userId,
  productId,
  currentQuantity,
  maxStock,
}: {
  userId: string;
  productId: number;
  currentQuantity: number;
  maxStock: number;
}) {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxStock) return;
    
    setLoading(true);
    try {
      await updateCartItemQuantity(userId, productId, newQuantity);
      setQuantity(newQuantity);
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'Nie udało się zaktualizować ilości');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm('Czy na pewno chcesz usunąć ten produkt z koszyka?')) {
      return;
    }

    setLoading(true);
    try {
      await removeFromCart(userId, productId);
      router.refresh();
    } catch (error: any) {
      alert(error.message || 'Nie udało się usunąć produktu');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Kontrolki ilości */}
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
        <button
          onClick={() => handleUpdateQuantity(quantity - 1)}
          disabled={loading || quantity <= 1}
          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
        >
          −
        </button>
        <span className="px-3 py-1 font-semibold min-w-[40px] text-center">
          {quantity}
        </span>
        <button
          onClick={() => handleUpdateQuantity(quantity + 1)}
          disabled={loading || quantity >= maxStock}
          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg"
        >
          +
        </button>
      </div>

      {/* Przycisk usuń */}
      <button
        onClick={handleRemove}
        disabled={loading}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
        title="Usuń z koszyka"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Usuń
      </button>
    </div>
  );
}