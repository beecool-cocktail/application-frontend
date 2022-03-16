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
        backgroundColor: '#292929'
      }}
      onClick={handleClick}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          p: 0,
          height: '22px',
          color: '#ebebeb',
          fontSize: '16px',
          '&::placeholder': {
            color: '#7b7b7b'
          }
        }}
        placeholder={placeHolder}
        onClick={onClick}
      />
      <IconButton sx={{ p: 0, color: '#7B7B7B' }}>
        <Search />
      </IconButton>
    </Box>
  )
}

export default SearchBar
