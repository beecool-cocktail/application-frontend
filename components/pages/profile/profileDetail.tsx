import React from 'react'
import { Box, Stack, Typography, Tabs, Tab } from '@mui/material'
import {
  FeedOutlined as FeedIcon,
  SettingsOutlined as SettingsIcon
} from '@mui/icons-material'
import { useState } from 'react'
import useGoto from 'lib/hooks/useGoto'
import storage from 'lib/helper/storage'
import Avatar from 'components/common/image/avatar'
import ProfileDetailRow from './profileDetailRow'
import CollectionTabPanel from './collectionTabPanel'
import PostTabPanel from './postTabPanel'

const FALLBACK_URL = '/cocktail.jpg'

const ProfileDetail = () => {
  const { gotoIndex, gotoDraft, gotoSettings } = useGoto()
  const [value, setValue] = useState(0)
  const userInfo = storage.getUserInfo()

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if (!userInfo) {
    gotoIndex()
    return null
  }

  const avatarUrl = userInfo.photo || FALLBACK_URL

  return (
    <Stack flex={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Profile</Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={1}
        >
          <FeedIcon fontSize="large" onClick={gotoDraft} />
          <SettingsIcon fontSize="large" onClick={gotoSettings} />
        </Stack>
      </Stack>
      <Box mt={2}>
        <Avatar src={avatarUrl} size={80} />
      </Box>
      <Box mt={2}>
        <ProfileDetailRow
          userId={userInfo.user_id}
          userName={userInfo.user_name}
          postCount={userInfo.number_of_post}
          collectionCount={userInfo.number_of_collection}
        />
      </Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="我的發文" />
        <Tab label="收藏" />
      </Tabs>
      <PostTabPanel value={value} index={0} />
      <CollectionTabPanel value={value} index={1} />
    </Stack>
  )
}

export default ProfileDetail
