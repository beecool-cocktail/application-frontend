import { Stack, Typography } from '@mui/material'

interface SettingItemGroupProps {
  title?: string
  children: React.ReactNode
}

const SettingItemGroup = ({ title, children }: SettingItemGroupProps) => {
  return (
    <Stack>
      {title && (
        <Typography
          variant="body2"
          sx={{ color: theme => theme.palette.light1.main }}
        >
          {title}
        </Typography>
      )}
      <Stack alignItems="stretch" borderRadius="6px" overflow="hidden">
        {children}
      </Stack>
    </Stack>
  )
}

export default SettingItemGroup
