import { MouseEventHandler, forwardRef } from 'react'
import { Box, IconButton, InputBase } from '@mui/material'
import useSearchBar from 'lib/application/useSearchBar'
import Search from 'lib/assets/search/default.svg'
import Close from 'lib/assets/cancelClose/default.svg'

type SearchBarProps = {
  placeHolder: string
  autoFocus?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ placeHolder, autoFocus = false, onClick }, ref) => {
    const { focused, input, setInput, handleBlur, handleFocus, handleCancel } =
      useSearchBar()

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
              if (focused) return theme.palette.light1.main
              return theme.palette.light4.main
            }
          }}
        >
          <Search viewBox="0 0 48 48 " width={24} height={24} />
        </IconButton>
        <InputBase
          ref={ref}
          autoFocus={autoFocus}
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
          value={input}
          placeholder={focused ? '' : placeHolder}
          onClick={onClick}
          onChange={e => setInput(e.target.value)}
        />
        {input && (
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
)

SearchBar.displayName = 'SearchBar'

export default SearchBar
