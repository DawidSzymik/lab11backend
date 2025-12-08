import { auth } from "@/lib/auth";
import { SignIn, SignOut } from "@/components/auth-components";
import { getCartWithItems, getCartTotal, getAllUsersWithCarts, transferCart } from "@/lib/actions/cart";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function BasketPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Koszyk</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-lg mb-4">Musisz być zalogowany, aby zobaczyć swój koszyk.</p>
          <SignIn provider="github" />
        </div>
      </div>
    );
  }

  const cart = await getCartWithItems(session.user.id);
  const total = await getCartTotal(session.user.id);
  const allUsers = await getAllUsersWithCarts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Koszyk</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Zalogowany jako: <strong>{session.user.email}</strong>
          </span>
          <SignOut />
        </div>
      </div>

      {!cart || cart.items.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-600">Twój koszyk jest pusty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 flex gap-4">
                {item.product.imageUrl && (
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="object-contain rounded"
                  />
                )}
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{item.product.name}</h3>
                  <p className="text-gray-600 text-sm">{item.product.category.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.product.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{Number(item.product.price).toFixed(2)} zł</p>
                  <p className="text-gray-600">Ilość: {item.quantity}</p>
                  <p className="font-semibold mt-2">
                    {(Number(item.product.price) * item.quantity).toFixed(2)} zł
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Podsumowanie</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Produkty ({cart.items.length}):</span>
                  <span>{total.toFixed(2)} zł</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Razem:</span>
                  <span>{total.toFixed(2)} zł</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Przejdź do kasy
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Transfer koszyka (Admin)</h2>
        <form action={async (formData: FormData) => {
          'use server';
          const from = formData.get('from') as string;
          const to = formData.get('to') as string;
          
          if (from && to) {
            await transferCart(from, to);
            redirect('/basket');
          }
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Od użytkownika:</label>
              <select name="from" className="w-full border border-gray-300 rounded p-2" required>
                <option value="">Wybierz użytkownika</option>
                {allUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email} ({user.cart?.items.length || 0} produktów)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-2">Do użytkownika:</label>
              <select name="to" className="w-full border border-gray-300 rounded p-2" required>
                <option value="">Wybierz użytkownika</option>
                {allUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Przenieś koszyk
          </button>
        </form>
      </div>
    </div>
  );
}