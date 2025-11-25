"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProductsAlphabetically, getAllProductsByNewest, getProductsInStock } from '@/lib/products';
import styles from './page.module.css';

export default function ProductList() {
  const [sortBy, setSortBy] = useState<"alphabetical" | "newest">("alphabetical");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  // Pobierz produkty według sortowania
  let displayedProducts = sortBy === "alphabetical" 
    ? getAllProductsAlphabetically()
    : getAllProductsByNewest();

  // Filtruj według dostępności
  if (showAvailableOnly) {
    displayedProducts = displayedProducts.filter(p => p.amount > 0);
  }

  return (
    <div>
      <h2 className={styles.title}>Lista produktów</h2>
      
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="sort">Sortuj:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "alphabetical" | "newest")}
          >
            <option value="alphabetical">Alfabetycznie</option>
            <option value="newest">Najnowsze</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <input
            type="checkbox"
            id="available"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
          />
          <label htmlFor="available">Tylko dostępne</label>
        </div>
      </div>

      <p>Wyświetlanych produktów: {displayedProducts.length}</p>
      
      <div className={styles.productGrid}>
        {displayedProducts.map(product => (
          <Link 
            key={product.id} 
            href={`/product-list/${product.id}`}
            className={styles.productCard}
          >
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
          </Link>
        ))}
      </div>
    </div>
  );
}