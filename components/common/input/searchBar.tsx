import { MouseEventHandler, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, IconButton, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'
import { paths } from 'lib/configs/routes'
import useStore from 'lib/hooks/useStore'

type SearchBarProps = {
  placeHolder: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = ({ placeHolder, onClick }: SearchBarProps) => {
  const router = useRouter()
  const searchBarInput = useStore(state => state.searchBarInput)
  const setSearchBarInput = useStore(state => state.setSearchBarInput)
  const handleClick = useCallback(() => {
    router.push(paths.search)
  }, [router])

  useEffect(() => {
    setSearchBarInput('')
    return () => setSearchBarInput('')
  }, [setSearchBarInput])

  return (
    <Box
      component="form"
      sx={{
        px: '12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
        height: '40px',
        backgroundColor: theme => theme.palette.dark6.main
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
            color: 'light4.main'
          }
        }}
        value={searchBarInput}
        placeholder={placeHolder}
        onClick={onClick}
        onChange={e => setSearchBarInput(e.target.value)}
      />
      <IconButton sx={{ p: 0, color: 'light4.main' }}>
        <Search />
      </IconButton>
    </Box>
  )
}

export default SearchBar
