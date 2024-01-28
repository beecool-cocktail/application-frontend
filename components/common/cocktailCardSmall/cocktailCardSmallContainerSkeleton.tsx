import CardGridContainer from './cocktailCardSmallContainer'
import CocktailCardSmallSkeleton from './cocktailCardSmallSkeleton'

const CocktailCardSmallContainerSkeleton = () => (
  <CardGridContainer>
    {Array.from(new Array(6)).map((_item, index) => (
      <CardGridContainer.Item key={index}>
        <CocktailCardSmallSkeleton />
      </CardGridContainer.Item>
    ))}
  </CardGridContainer>
)

export default CocktailCardSmallContainerSkeleton
