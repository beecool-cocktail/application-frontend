import { useEffect, useState } from 'react'
import debounce from 'lodash.debounce'

const useDebounce = <T>(value: T, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = debounce(setDebouncedValue, ms)
    handler(value)
    return () => handler.cancel()
  }, [value, ms])

  return debouncedValue
}

export default useDebounce
