import HomePage from "./home/features";
import styles from "./page.module.css"; 

export default function Home() {
  return (
    <section className={styles.page}> 
      <HomePage />
    </section>
  );
}
