import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory } from '@/lib/db-products';  // ZMIEŃ TO
import MainProductList from './MainProductList';
import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail';

export default async function CatchAllProductPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return <MainProductList />;
  }

  if (slug.length === 1) {
    const maybeId = parseInt(slug[0]);
    
    if (!isNaN(maybeId)) {
      const product = await getProductById(maybeId);  // DODAJ await
      
      if (!product) {
        notFound();
      }

      return <ProductDetail product={product} backLink="/product-list" backText="Powrót do listy produktów" />;
    }
    
    const category = slug[0];
    const products = await getProductsByCategory(category);  // DODAJ await
    
    if (products.length === 0) {
      notFound();
    }

    return <CategoryList category={category} products={products} />;
  }

  if (slug.length === 2) {
    const category = slug[0];
    const productId = parseInt(slug[1]);
    
    if (isNaN(productId)) {
      notFound();
    }

    const product = await getProductById(productId);  // DODAJ await
    
    if (!product || product.category.name !== category) {  // ZMIEŃ product.type na product.category.name
      notFound();
    }

    return <ProductDetail product={product} backLink={`/product-list/${category}`} backText={`Powrót do kategorii ${category}`} />;
  }

  notFound();
}