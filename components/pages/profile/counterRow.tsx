import { Divider, Stack, Skeleton, Typography } from '@mui/material'

export interface CounterRowProps {
  loading?: boolean
  collectionCount?: number
  postCount?: number
}

interface CounterStackProps {
  loading?: boolean
  title: string
  count?: number
}

const CounterStack = ({ loading, title, count = 0 }: CounterStackProps) => {
  return (
    <Stack
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          width={36}
          height={25}
          sx={{ borderRadius: '4px' }}
        />
      ) : (
        <Typography
          variant="subtitle1"
          sx={{ color: theme => theme.palette.light1.main }}
        >
          {count}
        </Typography>
      )}
      <Typography
        variant="body3"
        sx={{ color: theme => theme.palette.light4.main }}
      >
        {title}
      </Typography>
    </Stack>
  )
}

const CounterRow = ({
  loading,
  collectionCount = 0,
  postCount = 0
}: CounterRowProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: theme => theme.palette.dark5.main,
        width: 1,
        height: 64,
        mt: '8px',
        borderTop: theme => `1px solid ${theme.palette.dark6.main}`,
        borderBottom: theme => `1px solid ${theme.palette.dark6.main}`
      }}
    >
      <CounterStack title="發文數" loading={loading} count={postCount} />
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: theme => theme.palette.dark6.main }}
      />
      <CounterStack title="收藏數" loading={loading} count={collectionCount} />
    </Stack>
  )
}

export default CounterRow
