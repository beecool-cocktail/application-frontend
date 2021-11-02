import styles from "../../styles/Home.module.css";
import CocktailCard from "./cocktailCard";
import SpinLoader from "../spinLoader";

export default function CocktailList({ cocktails, loading }) {
  const renderContent = () => {
    if (loading) return <SpinLoader />;
    return cocktails.map((cocktail) => (
      <CocktailCard key={cocktail.id} cocktail={cocktail} />
    ));
  };

  return <div className={styles.cocktailList}>{renderContent()}</div>;
}
