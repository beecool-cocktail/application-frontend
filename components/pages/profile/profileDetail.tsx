import React, { useState } from 'react'
import { Box, Stack, Typography, Tabs, Tab } from '@mui/material'
import {
  FeedOutlined as FeedIcon,
  SettingsOutlined as SettingsIcon
} from '@mui/icons-material'
import useGoto from 'lib/hooks/useGoto'
import Avatar from 'components/common/image/avatar'
import Spinner from 'components/common/status/spinner'
import Error from 'components/common/status/error'
import useUserInfo from 'lib/hooks/useUserInfo'
import storage from 'lib/helper/storage'
import ProfileDetailRow from './profileDetailRow'
import CollectionTabPanel from './collectionTabPanel'
import PostTabPanel from './postTabPanel'

const ProfileDetail = () => {
  const { gotoIndex, gotoDraft, gotoSettings } = useGoto()
  const [value, setValue] = useState(0)
  const { userInfo, loading, error } = useUserInfo()

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if (!storage.getToken()) {
    gotoIndex()
    return null
  }

  if (loading) return <Spinner />
  if (!userInfo || error) return <Error />

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
        <Avatar src={userInfo.photo} size={80} />
      </Box>
      <Box mt={2}>
        <ProfileDetailRow />
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