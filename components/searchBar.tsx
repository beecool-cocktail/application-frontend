import { Paper, InputBase } from '@mui/material'
import { useRouter } from 'next/router'
import { MouseEventHandler, useCallback } from 'react'

type SearchBarProps = {
  onClick?: MouseEventHandler<HTMLDivElement>
}

const SearchBar = ({ onClick }: SearchBarProps) => {
  const router = useRouter()
  const handleClick = useCallback(() => {
    router.push('/search')
  }, [router])

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      onClick={handleClick}
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
