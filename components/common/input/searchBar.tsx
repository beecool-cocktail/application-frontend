import { Box, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { MouseEventHandler, useCallback } from 'react'
import { paths } from 'lib/configs/routes'

type SearchBarProps = {
  placeHolder: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = ({ placeHolder, onClick }: SearchBarProps) => {
  const router = useRouter()
  const handleClick = useCallback(() => {
    router.push(paths.search)
  }, [router])

  return (
    <Box
      component="form"
      sx={{
        px: '12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        height: '40px',
        backgroundColor: 'dark6.main'
      }}
      onClick={handleClick}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          p: 0,
          height: '22px',
          color: 'light1.main',
          fontSize: '16px',
          '&::placeholder': {
            color: 'light4'
          }
        }}
        placeholder={placeHolder}
        onClick={onClick}
      />
      <IconButton sx={{ p: 0, color: 'light4.main' }}>
        <Search />
      </IconButton>
    </Box>
  )
}

export default SearchBar
