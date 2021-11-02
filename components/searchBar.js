import styles from "../styles/Home.module.css";

export default function SearchBar() {
  return (
    <div className={styles.search}>
      <input className={styles.searchBar} placeholder="尋找調酒" />
    </div>
  );
}
