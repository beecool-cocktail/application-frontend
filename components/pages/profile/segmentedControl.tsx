import { Tab, TabProps, Tabs, Typography } from '@mui/material'

interface SegmentedControlProps {
  tabs: string[]
  tabIndex: number
  onChange(_e: React.SyntheticEvent, newValue: number): void
}

const StyledTab = (props: TabProps) => (
  <Tab
    {...props}
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
  />
)

const SegmentedControl = ({
  tabs,
  tabIndex,
  onChange
}: SegmentedControlProps) => {
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
      value={tabIndex}
      onChange={onChange}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />
      }}
    >
      {tabs.map(tab => (
        <StyledTab
          disableRipple
          key={tab}
          label={
            <Typography sx={{ transitionDuration: '.1s' }}>{tab}</Typography>
          }
        />
      ))}
    </Tabs>
  )
}

export default SegmentedControl
