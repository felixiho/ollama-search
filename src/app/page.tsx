import styles from "./page.module.css";
import NavHeader from "./home/components/navigation/NavHeader";
import Landing from "./home/features/landing";

export default function Home() {
  return (
    <section className={styles.page}>
      <NavHeader />
      <Landing />
    </section>
  );
}
