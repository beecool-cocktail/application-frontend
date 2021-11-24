import { Paper, InputBase } from '@mui/material'
import { MouseEventHandler } from 'react'

type SearchBarProps = {
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = ({ onClick }: SearchBarProps) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      onClick={() => {}}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Wines"
        onClick={onClick}
      />
    </Paper>
  )
}

export default SearchBar
