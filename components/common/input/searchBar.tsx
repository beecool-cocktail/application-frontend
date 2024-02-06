import { MouseEventHandler } from 'react'
import { Box } from '@mui/material'
import useSearchBarInner from 'lib/application/hooks/ui/useSearchBarInner'
import Search from 'lib/assets/searchOutlined.svg'
import Close from 'lib/assets/cancelClose.svg'
import Input from './input'

type SearchBarProps = {
  placeholder: string
  autoFocus?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = (props: SearchBarProps) => {
  const { ref, input, setInput, handleCancel } = useSearchBarInner()

  return (
    <Input
      {...props}
      fullWidth
      inputRef={ref}
      value={input}
      onChange={setInput}
      startAdornment={<Search />}
      endAdornment={
        input ? (
          <Box sx={{ cursor: 'pointer' }} onClick={handleCancel}>
            <Close />
          </Box>
        ) : null
      }
    />
  )
}

SearchBar.displayName = 'SearchBar'

export default SearchBar
