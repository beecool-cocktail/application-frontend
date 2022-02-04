import styles from 'lib/styles/Home.module.css'
import SpinLoader from '../spinLoader'
import CocktailCard from './cocktailCard'

export default function CocktailList({ cocktails, loading }) {
  const renderContent = () => {
    if (loading) return <SpinLoader />
    return cocktails.map(cocktail => (
      <CocktailCard key={cocktail.id} cocktail={cocktail} />
    ))
  }

  return <div className={styles.cocktailList}>{renderContent()}</div>
}
