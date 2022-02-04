import React from 'react'
import { Stack } from '@mui/material'

export interface TabPanelProps {
  value: number
  index: number
  children: React.ReactChild
}

const TabPanel = ({ index, value, children }: TabPanelProps) => {
  if (index !== value) return null
  return (
    <Stack flex={1} alignItems="center" justifyContent="center">
      {children}
    </Stack>
  )
}

export default TabPanel
