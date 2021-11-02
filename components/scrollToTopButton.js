import { AiOutlineArrowUp } from "react-icons/ai";
import styles from "../styles/Layout.module.css";

export default function ScrollToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button className={styles.scrollToTopButton} onClick={handleClick}>
      <AiOutlineArrowUp size={24} />
    </button>
  );
}
