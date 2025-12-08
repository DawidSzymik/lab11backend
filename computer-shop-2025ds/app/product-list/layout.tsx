export default function ProductListLayout({
  products,
  discounts,
}: {
  products: React.ReactNode;
  discounts: React.ReactNode;
}) {
  return (
    <div>
      {discounts}
      <div className="mt-8">
        {products}
      </div>
    </div>
  );
}