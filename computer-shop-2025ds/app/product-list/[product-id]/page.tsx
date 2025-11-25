import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from '@/lib/products';
import styles from './page.module.css';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ "product-id": string }>;
}) {
  const { "product-id": productId } = await params;
  
  // Sprawdź czy productId jest liczbą
  const id = parseInt(productId);
  if (isNaN(id)) {
    notFound();
  }

  // Znajdź produkt
  const product = getProductById(id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <Link href="/product-list" className={styles.backLink}>
        ← Powrót do listy produktów
      </Link>

      <div className={styles.productDetail}>
        <div className={styles.productGrid}>
          <div className={styles.imageSection}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className={styles.productImage}
            />
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productType}>Typ: {product.type}</p>
            
            <p className={styles.productDescription}>
              {product.description}
            </p>

            <div className={styles.productSpecs}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>ID produktu:</span>
                <span className={styles.specValue}>{product.id}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Kod produktu:</span>
                <span className={styles.specValue}>{product.code}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Typ:</span>
                <span className={styles.specValue}>{product.type}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Stan magazynowy:</span>
                <span className={styles.specValue}>{product.amount} szt.</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Data dodania:</span>
                <span className={styles.specValue}>
                  {new Date(product.date).toLocaleDateString('pl-PL')}
                </span>
              </div>
            </div>

            <div className={styles.productPrice}>
              {product.price.toFixed(2)} zł
            </div>

            <div className={`${styles.availabilityBadge} ${product.amount > 0 ? styles.available : styles.unavailable}`}>
              {product.amount > 0 ? '✓ Dostępny' : '✗ Niedostępny'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}