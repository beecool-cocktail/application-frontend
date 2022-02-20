import { AlertColor } from '@mui/material'

export interface SnackbarApiProps {
  duration?: number
  message?: string | React.ReactNode
}

export interface SnackbarState extends Required<SnackbarApiProps> {
  open: boolean
  severity: AlertColor
}

export type SnackbarApi = Record<AlertColor, (props: SnackbarApiProps) => void>
