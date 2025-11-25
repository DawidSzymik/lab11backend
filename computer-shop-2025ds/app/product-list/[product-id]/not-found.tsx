import Link from "next/link";
import styles from "./not-found.module.css";

export default function ProductNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Produkt nie został znaleziony</h2>
        <p className={styles.description}>
          Produkt o podanym identyfikatorze nie istnieje w naszej bazie danych.
        </p>
        <p className={styles.description}>
          Może został usunięty lub podano nieprawidłowy adres.
        </p>
        <Link href="/product-list" className={styles.backButton}>
          ← Powrót do listy produktów
        </Link>
      </div>
    </div>
  );
}