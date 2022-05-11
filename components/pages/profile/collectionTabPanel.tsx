import FavoriteCocktailCardList from 'components/common/favoriteCocktailList/favoriteCocktailList'
import TabPanel from './tabPanel'

export interface CollectionTabPanelProps {
  value: number
  index: number
  userId?: number
}

const CollectionTabPanel = ({
  userId,
  index,
  value
}: CollectionTabPanelProps) => {
  return (
    <TabPanel index={index} value={value}>
      <FavoriteCocktailCardList userId={userId} />
    </TabPanel>
  )
}

export default CollectionTabPanel
