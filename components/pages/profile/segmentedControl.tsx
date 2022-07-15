import { Tab, Tabs, Typography } from '@mui/material'
import React from 'react'

interface SegmentedControlProps {
  userId: number | undefined
  tab: number
  onChange(_e: React.SyntheticEvent, newValue: number): void
}

const SegmentedControl = ({ userId, tab, onChange }: SegmentedControlProps) => {
  return (
    <Tabs
      sx={{
        position: 'sticky',
        top: 40,
        zIndex: 100,
        height: '40px',
        minHeight: '40px',
        backgroundColor: theme => theme.palette.dark3.main,
        '& .MuiTabs-indicator': {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        },
        '& .MuiTabs-indicatorSpan': {
          maxWidth: 64,
          width: '100%',
          backgroundColor: theme => theme.palette.primary.lighter
        }
      }}
      value={tab}
      onChange={onChange}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />
      }}
    >
      <Tab
        sx={{
          minHeight: '40px',
          height: '40px',
          width: '100px',
          p: 0,
          color: theme => theme.palette.light3.main,
          fontSize: theme => theme.typography.subtitle2.fontSize,
          fontWeight: theme => theme.typography.subtitle2.fontWeight,
          lineHeight: theme => theme.typography.subtitle2.lineHeight,
          '&.Mui-selected .MuiTypography-root': {
            color: theme => theme.palette.primary.lighter,
            fontSize: theme => theme.typography.subtitle1.fontSize,
            fontWeight: theme => theme.typography.subtitle1.fontWeight,
            lineHeight: theme => theme.typography.subtitle1.lineHeight
          }
        }}
        label={<Typography>{userId ? '發文' : '我的發文'}</Typography>}
      />
      <Tab
        sx={{
          minHeight: '40px',
          height: '40px',
          width: '100px',
          p: 0,
          color: theme => theme.palette.light3.main,
          fontSize: theme => theme.typography.subtitle2.fontSize,
          fontWeight: theme => theme.typography.subtitle2.fontWeight,
          lineHeight: theme => theme.typography.subtitle2.lineHeight,
          '&.Mui-selected .MuiTypography-root': {
            color: theme => theme.palette.primary.lighter,
            fontSize: theme => theme.typography.subtitle1.fontSize,
            fontWeight: theme => theme.typography.subtitle1.fontWeight,
            lineHeight: theme => theme.typography.subtitle1.lineHeight
          }
        }}
        label={<Typography>收藏文章</Typography>}
      />
    </Tabs>
  )
}

export default SegmentedControl
