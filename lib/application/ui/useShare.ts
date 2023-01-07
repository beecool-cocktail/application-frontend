import snackbarMessages from 'lib/constants/snackbarMessages'
import useSnackbar from './useSnackbar'

const useShare = () => {
  const snackbar = useSnackbar()

  const share = async (text: string, url?: string) => {
    url = url || window.location.href

    if (!navigator.share) {
      navigator.clipboard.writeText(url)
      snackbar.success(snackbarMessages.copyUrl.success)
      return
    }

    try {
      await navigator.share({ title: document.title, url, text })
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'AbortError') return
        snackbar.error(`share failed: ${e.message}`)
      }
    }
  }

  return share
}

export default useShare
