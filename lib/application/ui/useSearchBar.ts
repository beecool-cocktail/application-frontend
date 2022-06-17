import { useRef, useState } from 'react'
import useStore from 'lib/services/storeAdapter'

const useSearchBar = () => {
  const [focused, setFocused] = useState<boolean>(false)
  const input = useStore(state => state.searchBarInput)
  const setInput = useStore(state => state.setSearchBarInput)
  const ref = useRef<HTMLIFrameElement>()

  const handleBlur = () => setFocused(false)
  const handleFocus = () => setFocused(true)
  const handleCancel = () => {
    setInput('')
    ref.current?.focus()
  }

  return {
    ref,
    focused,
    input,
    setInput,
    handleBlur,
    handleFocus,
    handleCancel
  }
}

export default useSearchBar
