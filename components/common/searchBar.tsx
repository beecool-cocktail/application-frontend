import { Paper, InputBase } from '@mui/material'
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
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      onClick={handleClick}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeHolder}
        onClick={onClick}
      />
    </Paper>
  )
}

export default SearchBar
