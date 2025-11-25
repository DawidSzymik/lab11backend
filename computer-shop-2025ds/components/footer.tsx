import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <p>
            © {currentYear} Computer Shop - Autor: [Twoje Imię i Nazwisko]
          </p>
          <p className={styles.date}>
            Aktualna data: {currentDate}
          </p>
        </div>
        
        <div>
          <Link 
            href="https://pk.edu.pl" 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Politechnika Krakowska im. Tadeusza Kościuszki
          </Link>
        </div>
      </div>
    </footer>
  );
}