import { Divider, Stack, Typography } from '@mui/material'

export interface CounterRowProps {
  collectionCount: number
  postCount: number
}

interface CounterStackProps {
  title: string
  count: number
}

const CounterStack = ({ title, count }: CounterStackProps) => {
  return (
    <Stack
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: theme => theme.palette.light1.main }}
      >
        {count}
      </Typography>
      <Typography
        variant="body3"
        sx={{ color: theme => theme.palette.light4.main }}
      >
        {title}
      </Typography>
    </Stack>
  )
}

const CounterRow = ({ collectionCount, postCount }: CounterRowProps) => {
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
      <CounterStack title="發文數" count={postCount} />
      <Divider
        orientation="vertical"
        flexItem
        sx={{ color: theme => theme.palette.dark6.main }}
      />
      <CounterStack title="收藏數" count={collectionCount} />
    </Stack>
  )
}

export default CounterRow
