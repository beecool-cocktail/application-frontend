import { Box } from '@mui/material'
import Image from 'next/dist/client/image'
import TabPanel from './tabPanel'

export interface PostTabPanelProps {
  value: number
  index: number
}

const PostTabPanel = ({ index, value }: PostTabPanelProps) => {
  return (
    <TabPanel index={index} value={value}>
      <Box>
        <Image src="/post.png" alt="post" width={512} height={392} />
      </Box>
    </TabPanel>
  )
}

export default PostTabPanel
