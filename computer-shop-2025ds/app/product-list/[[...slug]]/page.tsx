import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory } from '@/lib/products';
import MainProductList from './MainProductList';
import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail';

export default async function CatchAllProductPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  // Przypadek 0: /product-list (brak slug)
  if (!slug || slug.length === 0) {
    return <MainProductList />;
  }

  // Przypadek 1: /product-list/5 lub /product-list/GPU
  if (slug.length === 1) {
    const maybeId = parseInt(slug[0]);
    
    if (!isNaN(maybeId)) {
      const product = getProductById(maybeId);
      
      if (!product) {
        notFound();
      }

      return <ProductDetail product={product} backLink="/product-list" backText="Powrót do listy produktów" />;
    }
    
    const category = slug[0];
    const products = getProductsByCategory(category);
    
    if (products.length === 0) {
      notFound();
    }

    return <CategoryList category={category} products={products} />;
  }

  // Przypadek 2: /product-list/GPU/1
  if (slug.length === 2) {
    const category = slug[0];
    const productId = parseInt(slug[1]);
    
    if (isNaN(productId)) {
      notFound();
    }

    const product = getProductById(productId);
    
    if (!product || product.type !== category) {
      notFound();
    }

    return <ProductDetail product={product} backLink={`/product-list/${category}`} backText={`Powrót do kategorii ${category}`} />;
  }

  notFound();
}