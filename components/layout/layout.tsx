import { Stack } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import useGoto from '../../hooks/useGoto'
import LoginDialog from '../loginDialog'
import NavigationBar from './navigationBar'
import FloatingPostButton from '../button/floatingPostButton'

type LayoutProps = {
  header?: ReactNode
  children: ReactNode
}

const Layout = ({ header, children }: LayoutProps) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)
  const { router, goto, gotoCreatePost } = useGoto({
    onBlock: () => setLoginDialogOpen(true)
  })

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      width={1}
      minHeight="100vh"
      padding={2}
    >
      {header}
      {children}
      <FloatingPostButton onClick={gotoCreatePost} />
      <NavigationBar value={router.asPath} onChange={goto} />
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
      />
    </Stack>
  )
}

export default Layout
