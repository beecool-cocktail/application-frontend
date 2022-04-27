import { MouseEventHandler } from 'react'
import { Box, IconButton, InputBase, Theme } from '@mui/material'
import useSearchBar from 'lib/application/useSearchBar'
import Search from 'lib/assets/search/default.svg'
import Close from 'lib/assets/cancelClose.svg'

type SearchBarProps = {
  placeHolder: string
  autoFocus?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = ({
  placeHolder,
  autoFocus = false,
  onClick
}: SearchBarProps) => {
  const {
    ref,
    focused,
    input,
    setInput,
    handleBlur,
    handleFocus,
    handleCancel
  } = useSearchBar()
  const getIconColor = (theme: Theme) => {
    if (focused || Boolean(input)) return theme.palette.light1.main
    return theme.palette.light4.main
  }

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
          color: getIconColor,
          fontSize: '24px',
          '& *': { stroke: getIconColor }
        }}
      >
        <Search />
      </IconButton>
      <InputBase
        inputRef={ref}
        autoFocus={autoFocus}
        sx={{
          ml: '4px',
          flex: 1,
          p: 0,
          height: '22px',
          color: theme => theme.palette.light1.main,
          fontSize: '16px',
          '&::placeholder': {
            color: theme => theme.palette.light4.main
          }
        }}
        value={input}
        placeholder={focused ? '' : placeHolder}
        onClick={onClick}
        onChange={e => setInput(e.target.value)}
      />
      {input && (
        <IconButton
          sx={{
            p: 0,
            fontSize: '24px',
            color: theme => theme.palette.light1.main
          }}
          onClick={handleCancel}
        >
          <Close />
        </IconButton>
      )}
    </Box>
  )
}

SearchBar.displayName = 'SearchBar'

export default SearchBar
