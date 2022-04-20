import MyCocktailList from 'components/common/myCocktailList/myCocktailList'
import TabPanel from './tabPanel'

export interface PostTabPanelProps {
  value: number
  index: number
}

const PostTabPanel = ({ index, value }: PostTabPanelProps) => {
  return (
    <TabPanel index={index} value={value}>
      <MyCocktailList />
    </TabPanel>
  )
}

export default PostTabPanel
