import { useEffect, useRef } from 'react'
import useCornerRouter from '../useCornerRouter'
import useSearchBar from './useSearchBar'

const useSearchBarInner = () => {
  const router = useCornerRouter()
  const { keyword: input, setKeyword: setInput } = useSearchBar()
  const ref = useRef<HTMLInputElement>()

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    if (router.isReady && !initialized.current) {
      setInput((router.query.keyword as string) || '')
      initialized.current = true
    }
  }, [router.isReady, router.query.keyword, setInput])

  useEffect(() => {
    if (!initialized.current) return
    if (!input) {
      router.replace({ query: {} }, undefined)
    }
    router.replace({ query: { keyword: input } }, undefined, { shallow: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

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

export default useSearchBarInner
