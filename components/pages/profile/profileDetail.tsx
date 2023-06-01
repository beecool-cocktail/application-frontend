import React, { useState, useEffect } from 'react'
import { Skeleton, Stack, Typography } from '@mui/material'
import useCornerRouter from 'lib/application/useCornerRouter'
import Avatar from 'components/common/image/avatar'
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
    if (!userId && !storage.getToken()) router.push(paths.index)
  }, [router, storage, userId])

  if (error) return <Error />

  return (
    <Stack>
      <TopNavigation isVisitor={Boolean(userId)} />
      <Stack
        sx={{
          alignItems: 'center',
          pt: '2px',
          mb: '4px',
          backgroundColor: theme => theme.palette.dark5.main
        }}
      >
        {loading || !user ? (
          <>
            <Skeleton variant="circular" sx={{ width: 84, height: 84 }} />
            <Skeleton
              variant="rectangular"
              sx={{ width: 174, height: 28, mt: '2px', borderRadius: '6px' }}
            />
            <CounterRow loading />
          </>
        ) : (
          <>
            <Avatar src={user.photo} userId={user.id} size={70} outlined />
            <Typography
              variant="h4"
              sx={{
                color: theme => theme.palette.light1.main,
                mt: '2px'
              }}
            >
              {user.username}
            </Typography>
            <CounterRow
              collectionCount={user.collectionCount}
              postCount={user.postCount}
            />
          </>
        )}
      </Stack>
      <SegmentedControl
        tabIndex={tab}
        tabs={['我的發文', '收藏文章']}
        onChange={handleChange}
      />
      <PostTabPanel userId={userId} value={tab} index={0} />
      <CollectionTabPanel userId={userId} value={tab} index={1} />
    </Stack>
  )
}

export default ProfileDetail
