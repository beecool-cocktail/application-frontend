import { Skeleton, Stack, Typography } from '@mui/material'
import useCornerRouter from 'lib/application/hooks/useCornerRouter'
import Avatar from 'components/common/image/avatar'
import Error from 'components/common/status/error'
import useUser from 'lib/application/hooks/user/useUser'
import { paths } from 'lib/application/configs/routes'
import CounterRow from 'components/pages/profile/counterRow'
import SegmentedControl from 'components/pages/profile/segmentedControl'
import PostTabPanel from 'components/pages/profile/postTabPanel'
import CollectionTabPanel from 'components/pages/profile/collectionTabPanel'
import TopNavigation from 'components/pages/profile/topNavigation'

interface ProfileDetailProps {
  userId?: number
  tab: 0 | 1
}

const ProfileDetail = ({ userId, tab }: ProfileDetailProps) => {
  const router = useCornerRouter()

  const { user, loading, error } = useUser(userId)
  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      if (userId) {
        return router.replace(paths.userById(userId), undefined, {
          scroll: false
        })
      }
      router.replace(paths.profile, undefined, { scroll: false })
    } else {
      if (userId) {
        return router.replace(paths.userCollectionsById(userId), undefined, {
          scroll: false
        })
      }
      router.replace(paths.collections, undefined, { scroll: false })
    }
  }

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
            <Avatar
              src={user.croppedAvatar}
              userId={user.id}
              size={70}
              outlined
            />
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
      <Stack direction="column" rowGap="8px">
        <SegmentedControl
          tabIndex={tab}
          tabs={['我的發文', '收藏文章']}
          onChange={handleChange}
        />
        <PostTabPanel userId={userId} value={tab} index={0} />
        <CollectionTabPanel userId={userId} value={tab} index={1} />
      </Stack>
    </Stack>
  )
}

export default ProfileDetail
