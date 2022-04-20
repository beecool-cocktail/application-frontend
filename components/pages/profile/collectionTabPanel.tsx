import FavoriteCocktailCardList from 'components/common/favoriteCocktailCardList/favoriteCocktailCardList'
import TabPanel from './tabPanel'

export interface CollectionTabPanelProps {
  value: number
  index: number
}

const CollectionTabPanel = ({ index, value }: CollectionTabPanelProps) => {
  return (
    <TabPanel index={index} value={value}>
      <FavoriteCocktailCardList />
    </TabPanel>
  )
}

export default CollectionTabPanel
