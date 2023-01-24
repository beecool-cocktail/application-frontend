import useSWR from 'swr'
import { FALLBACK_URL } from 'lib/constants/image'
import userService from 'lib/services/userAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from '../useConfig'
import useConfirmDialog from '../ui/useConfirmDialog'
import useSnackbar from '../ui/useSnackbar'
import { UpdateUserAvatarForm } from '../ports'
import useWholePageSpinner from '../ui/useWholePageSpinner'

const FETCH_KEY = 'CURRENT_USER'

const useCurrentUser = () => {
  const confirmDialog = useConfirmDialog()
  const snackbar = useSnackbar()
  const { setLoading: setWholePageLoading } = useWholePageSpinner()
  const storage = useLocalStorage()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { data, error, mutate } = useSWR(() => {
    const token = storage.getToken()
    if (!token) return null
    return [token, FETCH_KEY]
  }, userService.getCurrentUserInfo)

  const updateCollectionPublic = async () => {
    const token = storage.getToken()
    if (!token) return
    if (!user) return

    try {
      await userService.updateCurrentUserInfo(
        { isCollectionPublic: !user.isCollectionPublic },
        token
      )
      await mutate()
    } catch (error) {
      snackbar.error('change collection permission failed')
      console.error(error)
    }
  }

  const updateUsername = async (username: string) => {
    const token = storage.getToken()
    if (!token) return

    try {
      await userService.updateCurrentUserInfo({ username }, token)
      await mutate()
    } catch (error) {
      snackbar.error('edit username failed')
      console.error(error)
    }
  }

  const updateAvatar = async (form: UpdateUserAvatarForm) => {
    const token = storage.getToken()
    if (!token) return

    setWholePageLoading(true)
    try {
      await userService.updateCurrentUserAvatar(form, token)
      await mutate()
    } catch (e) {
      snackbar.error('update avatar failed')
      console.error(e)
    } finally {
      setWholePageLoading(false)
    }
  }

  const deleteAvatar = () => {
    confirmDialog.open({
      title: '刪除大頭貼',
      content: '刪除後會將頭貼改為系統預設圖片',
      onConfirm: async () => {
        const token = storage.getToken()
        if (!token) throw new Error('token expired')

        try {
          await userService.deleteCurrentUserAvatar(token)
          await mutate()
        } catch (error) {
          snackbar.success('delete failed')
          console.error(error)
        } finally {
          confirmDialog.destroy()
        }
      },
      onCancel: () => confirmDialog.destroy()
    })
  }

  let user = data
  if (data && config) {
    if (!data.photo)
      user = { ...data, photo: FALLBACK_URL, originAvatar: FALLBACK_URL }
    else
      user = {
        ...data,
        photo: toAbsolutePath(data.photo),
        originAvatar: toAbsolutePath(data.originAvatar)
      }
  } else {
    user = undefined
  }

  return {
    user,
    loading: (!data && !error) || configLoading,
    error,
    mutate,
    updateCollectionPublic,
    updateUsername,
    updateAvatar,
    deleteAvatar
  }
}

export default useCurrentUser
