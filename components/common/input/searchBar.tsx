import { MouseEventHandler } from 'react'
import { Box } from '@mui/material'
import useSearchBar from 'lib/application/ui/useSearchBar'
import Search from 'lib/assets/search/default.svg'
import Close from 'lib/assets/cancelClose.svg'
import Input from './input'

type SearchBarProps = {
  placeholder: string
  autoFocus?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = (props: SearchBarProps) => {
  const { ref, input, setInput, handleCancel } = useSearchBar()

  return (
    <Input
      {...props}
      fullWidth
      inputRef={ref}
      value={input}
      onChange={e => setInput(e.target.value)}
      onCompositionDone={v => setInput(v)}
      startAdornment={<Search />}
      endAdornment={
        <Box sx={{ cursor: 'pointer' }} onClick={handleCancel}>
          <Close />
        </Box>
      }
    />
  )
}

SearchBar.displayName = 'SearchBar'

export default SearchBar
