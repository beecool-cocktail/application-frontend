import { MouseEventHandler, useEffect, useState } from 'react'
import { Box, IconButton, InputBase } from '@mui/material'
import Search from 'lib/assets/search/default.svg'
import Close from 'lib/assets/cancelClose/default.svg'
import useStore from 'lib/hooks/useStore'

type SearchBarProps = {
  placeHolder: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = ({ placeHolder, onClick }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const searchBarInput = useStore(state => state.searchBarInput)
  const setSearchBarInput = useStore(state => state.setSearchBarInput)

  const handleBlur = () => setIsFocused(false)
  const handleFocus = () => setIsFocused(true)
  const handleCancel = () => setSearchBarInput('')

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
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      <IconButton
        sx={{
          p: 0,
          color: theme => {
            if (isFocused) return theme.palette.light1.main
            return theme.palette.light4.main
          }
        }}
      >
        <Search viewBox="0 0 48 48 " width={24} height={24} />
      </IconButton>
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          p: 0,
          height: '22px',
          color: theme => theme.palette.light1.main,
          fontSize: '16px',
          '&::placeholder': {
            color: theme => theme.palette.light4.main
          }
        }}
        value={searchBarInput}
        placeholder={isFocused ? '' : placeHolder}
        onClick={onClick}
        onChange={e => setSearchBarInput(e.target.value)}
      />
      {searchBarInput && (
        <IconButton
          sx={{ p: 0, color: theme => theme.palette.light1.main }}
          onClick={handleCancel}
        >
          <Close viewBox="0 0 48 48 " width={24} height={24} />
        </IconButton>
      )}
    </Box>
  )
}

export default SearchBar
