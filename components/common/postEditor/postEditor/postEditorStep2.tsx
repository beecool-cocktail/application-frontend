import React from 'react'
import { Stack } from '@mui/material'
import { CocktailPostPreview } from 'lib/domain/cocktail'
import Post from 'components/common/post/post'

interface PostPreviewProps {
  cocktailPost: CocktailPostPreview
}

const PostEditorStep2 = ({ cocktailPost }: PostPreviewProps) => {
  return (
    <Stack width={1}>
      <Post cocktailPost={cocktailPost} isPreview />
    </Stack>
  )
}

export default PostEditorStep2
