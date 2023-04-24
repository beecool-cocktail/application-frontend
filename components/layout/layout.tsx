import React, { ReactNode } from 'react'
import { Box, Stack } from '@mui/material'
import SearchBar from 'components/common/input/searchBar'
import SmallLogoIcon from 'lib/assets/bottomLine.svg'
import LogoHeader from './logoHeader'

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
          {useLogo && <LogoHeader />}
          {useSearchBar && (
            <Stack
              pt="12px"
              direction="row"
              alignItems="center"
              columnGap="8px"
            >
              <SmallLogoIcon width={25} height={25} />
              <SearchBar placeholder="找調酒..." autoFocus />
            </Stack>
          )}
        </Box>
        {children}
      </Stack>
    </>
  )
}

export default Layout
