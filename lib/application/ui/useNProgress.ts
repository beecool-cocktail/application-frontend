import { useRef, useEffect, useCallback } from 'react'
import NProgress, { NProgressOptions } from 'nprogress'
import { useRouter } from 'next/router'

const useNProgress = (
  showAfterMs = 300,
  options: Partial<NProgressOptions> = {}
) => {
  const router = useRouter()
  const timer = useRef<NodeJS.Timeout | null>(null)

  const routeChangeStart = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(NProgress.start, showAfterMs)
  }, [showAfterMs])

  const routeChangeEnd = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    NProgress.done()
  }, [])

  useEffect(() => {
    if (options) NProgress.configure(options)

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeEnd)
    router.events.on('routeChangeError', routeChangeEnd)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeEnd)
      router.events.off('routeChangeError', routeChangeEnd)
    }
  }, [options, routeChangeEnd, routeChangeStart, router.events])
}

export default useNProgress
