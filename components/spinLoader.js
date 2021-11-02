import styles from "../styles/Home.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SpinLoader() {
  return (
    <div className="loading">
      <AiOutlineLoading3Quarters size={40} />
    </div>
  );
}
