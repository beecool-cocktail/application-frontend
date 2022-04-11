import { useState } from 'react'
import useStore from 'lib/services/storeAdapter'

const useSearchBar = () => {
  const [focused, setFocused] = useState<boolean>(false)
  const input = useStore(state => state.searchBarInput)
  const setInput = useStore(state => state.setSearchBarInput)

  const handleBlur = () => setFocused(false)
  const handleFocus = () => setFocused(true)
  const handleCancel = () => setInput('')

  return {
    focused,
    input,
    setInput,
    handleBlur,
    handleFocus,
    handleCancel
  }
}

export default useSearchBar
