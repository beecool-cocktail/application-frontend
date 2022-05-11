import MyCocktailList from 'components/common/myCocktailList/myCocktailList'
import TabPanel from './tabPanel'

export interface PostTabPanelProps {
  value: number
  index: number
  userId?: number
}

const PostTabPanel = ({ index, value, userId }: PostTabPanelProps) => {
  return (
    <TabPanel index={index} value={value}>
      <MyCocktailList userId={userId} />
    </TabPanel>
  )
}

export default PostTabPanel
