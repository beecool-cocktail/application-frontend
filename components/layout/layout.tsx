import React, { ReactNode } from 'react'
import Image from 'next/image'
import { Box, Stack } from '@mui/material'
import SearchBar from 'components/common/input/searchBar'
import TabBar from './tabBar'

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
        pt={2}
        spacing={2}
        width={1}
        minHeight="100vh"
        sx={{ backgroundColor: '#0d0d0d' }}
      >
        <Box
          px="24px"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
        >
          {useLogo && (
            <Box position="relative" height={120} width="100%">
              <Image src="/logo.svg" alt="logo" layout="fill" />
            </Box>
          )}
          {useSearchBar && <SearchBar placeHolder="找調酒..." />}
        </Box>
        {children}
      </Stack>
      <TabBar />
    </>
  )
}

export default Layout
