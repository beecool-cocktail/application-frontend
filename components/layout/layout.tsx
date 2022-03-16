import { Stack } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import useGoto from 'lib/hooks/useGoto'
import { paths } from 'lib/configs/routes'
import LoginDialog from 'components/common/dialog/loginDialog'
import TabBar from './tabBar'

type LayoutProps = {
  header?: ReactNode
  children: ReactNode
}

const Layout = ({ header, children }: LayoutProps) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const { router, goto } = useGoto({
    onBlock: () => setLoginDialogOpen(true)
  })

  return (
    <>
      <Stack
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
        width={1}
        minHeight="100vh"
        sx={{ backgroundColor: '#0d0d0d' }}
      >
        {header}
        {children}
        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
        />
      </Stack>
      <TabBar value={router.asPath as paths} onChange={goto} />
    </>
  )
}

export default Layout
