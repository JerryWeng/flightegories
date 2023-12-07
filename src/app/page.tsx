import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.grid}>
          <Link href="/login" className={styles.card}>
            <h2>
              Login <span>-&gt;</span>
            </h2>
          </Link>

          <Link href="/register" className={styles.card}>
            <h2>
              Register <span>-&gt;</span>
            </h2>
          </Link>

          <button className={styles.card}>Logout</button>
        </div>
      </div>
      <div className={styles.reserve}>
        <a href="http://" target="_blank" rel="noopener noreferrer" className={styles.reserveLink}>
          Reserve Flights
        </a>
      </div>
    </main>
  );
}
