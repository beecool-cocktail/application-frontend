import React, { useState, useEffect } from 'react'
import { Stack, Typography } from '@mui/material'
import useCornerRouter from 'lib/application/useCornerRouter'
import Avatar from 'components/common/image/avatar'
import Loading from 'components/common/status/loading'
import Error from 'components/common/status/error'
import useUser from 'lib/application/user/useUser'
import useLocalStorage from 'lib/services/localStorageAdapter'
import { paths } from 'lib/configs/routes'
import CounterRow from './counterRow'
import CollectionTabPanel from './collectionTabPanel'
import PostTabPanel from './postTabPanel'
import SegmentedControl from './segmentedControl'
import TopNavigation from './topNavigation'

interface ProfileDetailProps {
  userId?: number
}

const ProfileDetail = ({ userId }: ProfileDetailProps) => {
  const storage = useLocalStorage()
  const router = useCornerRouter()
  const { user, loading, error } = useUser(userId)
  const [tab, setTab] = useState(0)

  const handleChange = (_e: React.SyntheticEvent, newValue: number) =>
    setTab(newValue)

  useEffect(() => {
    if (!storage.getToken()) router.push(paths.index)
  }, [router, storage])

  if (loading) return <Loading />
  if (!user || error) return <Error />

  return (
    <Stack flex={1}>
      {!userId && <TopNavigation />}
      <Stack
        sx={{
          alignItems: 'center',
          pt: '2px',
          backgroundColor: theme => theme.palette.dark5.main
        }}
      >
        <Avatar src={user.photo} size={70} />
        <Typography
          variant="h4"
          sx={{
            color: theme => theme.palette.light1.main,
            mt: '2px'
          }}
        >{`${user.username}#${user.id}`}</Typography>
        <CounterRow userId={userId} />
      </Stack>
      <SegmentedControl userId={userId} tab={tab} onChange={handleChange} />
      <PostTabPanel userId={userId} value={tab} index={0} />
      <CollectionTabPanel userId={userId} value={tab} index={1} />
    </Stack>
  )
}

export default ProfileDetail
