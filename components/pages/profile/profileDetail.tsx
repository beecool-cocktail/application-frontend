import React, { useState } from 'react'
import { Box, Stack, Typography, Tabs, Tab } from '@mui/material'
import {
  FeedOutlined as FeedIcon,
  SettingsOutlined as SettingsIcon
} from '@mui/icons-material'
import useCornerRouter from 'lib/application/useCornerRouter'
import Avatar from 'components/common/image/avatar'
import Loading from 'components/common/status/loading'
import Error from 'components/common/status/error'
import useUser from 'lib/application/useUser'
import useLocalStorage from 'lib/services/localStorageAdapter'
import ProfileDetailRow from './profileDetailRow'
import CollectionTabPanel from './collectionTabPanel'
import PostTabPanel from './postTabPanel'

interface ProfileDetailProps {
  userId?: number
}

const ProfileDetail = ({ userId }: ProfileDetailProps) => {
  const storage = useLocalStorage()
  const { gotoIndex, gotoDrafts: gotoDraft, gotoSettings } = useCornerRouter()
  const [value, setValue] = useState(0)
  const { user, loading, error } = useUser(userId)

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  if (!storage.getToken()) {
    gotoIndex()
    return null
  }

  if (loading) return <Loading />
  if (!user || error) return <Error />

  return (
    <Stack flex={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">Profile</Typography>
        {!userId && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <FeedIcon fontSize="large" onClick={gotoDraft} />
            <SettingsIcon fontSize="large" onClick={gotoSettings} />
          </Stack>
        )}
      </Stack>
      <Box mt={2}>
        <Avatar src={user.photo} size={80} />
      </Box>
      <Box mt={2}>
        <ProfileDetailRow />
      </Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label={userId ? '發文' : '我的發文'} />
        <Tab label="收藏" />
      </Tabs>
      <PostTabPanel value={value} index={0} />
      <CollectionTabPanel value={value} index={1} />
    </Stack>
  )
}

export default ProfileDetail
