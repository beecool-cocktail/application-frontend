import { Typography } from '@mui/material'
import TabPanel from './tabPanel'

export interface CollectionTabPanelProps {
  value: number
  index: number
}

const CollectionTabPanel = ({ index, value }: CollectionTabPanelProps) => {
  return (
    <TabPanel index={index} value={value}>
      <Typography variant="h4">沒有收藏 QQ</Typography>
    </TabPanel>
  )
}

export default CollectionTabPanel
