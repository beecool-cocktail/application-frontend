import { GlobalStyles } from '@mui/material'
import useNProgress from 'lib/application/hooks/ui/useNProgress'
import theme from 'lib/application/configs/theme'

const NProgress = () => {
  useNProgress(300, {
    showSpinner: false,
    template:
      '<div class="track"><div class="bar" role="bar"><div class="peg"></div></div></div>'
  })

  return (
    <GlobalStyles
      styles={{
        '& #nprogress .track': {
          position: 'fixed',
          zIndex: theme.zIndex.tooltip,
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: `${theme.palette.primary.darker} !important`,
          boxShadow: 'none'
        },
        '& #nprogress .bar': {
          backgroundColor: `${theme.palette.primary.main} !important`,
          boxShadow: 'none'
        },
        '& #nprogress .peg': {
          backgroundColor: `${theme.palette.primary.main} !important`,
          boxShadow: 'none'
        }
      }}
    />
  )
}

export default NProgress
