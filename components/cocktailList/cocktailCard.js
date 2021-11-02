import Image from "next/image";
import styles from "../../styles/Home.module.css";

export default function CocktailCard({ cocktail }) {
  const { name, tags, imageUrl } = cocktail;
  return (
    <div className={styles.cocktailCard}>
      <h3>{name}</h3>
      <Image src={imageUrl} alt={name} width={160} height={160} />
      {tags.map((tag, index) => {
        return <span key={index}>{tag}</span>;
      })}
    </div>
  );
}
