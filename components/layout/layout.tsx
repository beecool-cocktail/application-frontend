import React, { ReactNode } from 'react'
import { Box, Stack } from '@mui/material'
import SearchBar from 'components/common/input/searchBar'
import TabBar from './tabBar'
import Logo from './logo'

type LayoutProps = {
  useLogo?: boolean
  useSearchBar?: boolean
  children: ReactNode
}

const Layout = ({
  useLogo = false,
  useSearchBar = false,
  children
}: LayoutProps) => {
  return (
    <>
      <Stack
        justifyContent="flex-start"
        alignItems="stretch"
        width={1}
        minHeight="100vh"
        sx={{ backgroundColor: theme => theme.palette.dark3.main }}
      >
        <Box
          px="32px"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
        >
          {useLogo && <Logo />}
          {useSearchBar && (
            <Box pt="12px">
              <SearchBar placeHolder="找調酒..." autoFocus />
            </Box>
          )}
        </Box>
        {children}
      </Stack>
      <TabBar />
    </>
  )
}

export default Layout
