import { useEffect, useRef } from 'react'
import Router from 'next/router'
import useStore from 'lib/services/storeAdapter'
import useCornerRouter from '../useCornerRouter'

const useSearchBar = () => {
  const router = useCornerRouter()
  const input = useStore(state => state.searchBarInput)
  const setInput = useStore(state => state.setSearchBarInput)
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
      Router.replace({ query: {} }, undefined)
    }
    Router.replace({ query: { keyword: input } }, undefined, { shallow: true })
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

export default useSearchBar
