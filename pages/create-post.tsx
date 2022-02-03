import { Stack } from '@mui/material'
import { Typography } from '@mui/material'
import CreatePostHeader from '../components/pages/create-post/createPostHeader'

const CreatePost = () => {
  return (
    <Stack alignItems="stretch">
      <CreatePostHeader />
      <Stack alignItems="center" justifyContent="center" mt={12}>
        <Typography variant="h3">發文頁面</Typography>
      </Stack>
    </Stack>
  )
}

export default CreatePost
