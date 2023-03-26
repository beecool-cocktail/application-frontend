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
      <Stack justifyContent="flex-start" alignItems="stretch">
        <Box
          px="32px"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
        >
          {useLogo && <Logo />}
          {useSearchBar && (
            <Box pt="12px">
              <SearchBar placeholder="找調酒..." autoFocus />
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
