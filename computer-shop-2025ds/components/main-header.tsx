import Link from "next/link";
import Image from "next/image";
import NavLink from "./nav-link";
import styles from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/pk-logo.svg"
            alt="Politechnika Krakowska"
            width={50}
            height={50}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Computer Shop</span>
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
            <li>
              <NavLink href="/product-list">Products</NavLink>
            </li>
            <li>
              <NavLink href="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}