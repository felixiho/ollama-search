import Image from "next/image";
import styles from "./page.module.css";
import NavHeader from "./home/components/navigation/NavHeader";

export default function Home() {
  return (
    <section className={styles.page}>
      <NavHeader />
    </section>
  );
}
