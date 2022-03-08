import React from 'react'
import { Stack } from '@mui/material'
import Post from 'components/common/post/post'
import { CocktailPost } from 'lib/types/cocktail'

interface PostPreviewProps {
  cocktailPost: CocktailPost
}

const PostPreview = ({ cocktailPost }: PostPreviewProps) => {
  return (
    <Stack width={1}>
      <Post cocktailPost={cocktailPost}></Post>
    </Stack>
  )
}

export default PostPreview
