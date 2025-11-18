import { getAllProductsAlphabetically } from '@/lib/products';
import styles from './page.module.css';
import Image from 'next/image';

export default function ProductList() {
  const allProducts = getAllProductsAlphabetically();
  
  return (
    <div>
      <h2 className={styles.title}>Lista produktów</h2>
      <p>Wszystkich produktów: {allProducts.length}</p>
      
      <div className={styles.productGrid}>
        {allProducts.map(product => (
          <div key={product.id} className={styles.productCard}>
            <Image 
              src={product.image} 
              alt={product.name}
              width={200}
              height={200}
              className={styles.productImage}
            />
            <div className={styles.productName}>{product.name}</div>
            <div className={styles.productType}>Typ: {product.type}</div>
            <div className={styles.productPrice}>{product.price.toFixed(2)} zł</div>
            <div className={product.amount > 0 ? styles.productStock : styles.outOfStock}>
              Stan: {product.amount > 0 ? `${product.amount} szt.` : 'Brak na stanie'}
            </div>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}