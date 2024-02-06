import { useRef } from 'react'

const useOnce = (callback: () => void) => {
  const countRef = useRef<number>(0)
  if (countRef.current === 0) {
    callback()
    countRef.current++
  }
}

export default useOnce
