import { useRef } from 'react'
import useStore from 'lib/services/storeAdapter'

const useSearchBar = () => {
  const input = useStore(state => state.searchBarInput)
  const setInput = useStore(state => state.setSearchBarInput)
  const ref = useRef<HTMLInputElement>()

  const handleCancel = () => {
    setInput('')
    ref.current?.focus()
  }

  return {
    ref,
    input,
    setInput,
    handleCancel
  }
}

export default useSearchBar
