import useSWR from 'swr'
import { FALLBACK_URL } from 'lib/constants/image'
import userService from 'lib/services/userAdapter'
import { UpdateUserAvatarForm } from 'lib/domain/user'
import dialogMessages from 'lib/constants/dialogMessages'
import snackbarMessages from 'lib/constants/snackbarMessages'
import { paths } from 'lib/configs/routes'
import useAuth from '../useAuth'
import useConfig from '../useConfig'
import useConfirmDialog from '../ui/useConfirmDialog'
import useSnackbar from '../ui/useSnackbar'
import useWholePageSpinner from '../ui/useWholePageSpinner'
import useCornerRouter from '../useCornerRouter'

const FETCH_KEY = 'CURRENT_USER'

const useCurrentUser = () => {
  const confirmDialog = useConfirmDialog()
  const snackbar = useSnackbar()
  const router = useCornerRouter()
  const { token } = useAuth()
  const { setLoading: setWholePageLoading } = useWholePageSpinner()
  const { config, loading: configLoading, toAbsolutePath } = useConfig()
  const { data, error, mutate } = useSWR(() => {
    if (!token) return null
    return [token, FETCH_KEY]
  }, userService.getCurrentUserInfo)

  const updateCollectionPublic = async () => {
    if (!token) return
    if (!user) return

    try {
      await userService.updateCurrentUserInfo(
        { isCollectionPublic: !user.isCollectionPublic },
        token
      )
      await mutate()
    } catch (error) {
      snackbar.error(snackbarMessages.updateUserInfo.error)
      console.error(error)
    }
  }

  const updateUsername = async (username: string) => {
    if (!token) return

    try {
      await userService.updateCurrentUserInfo({ username }, token)
      await mutate()
      router.push(paths.settings)
    } catch (error) {
      snackbar.error(snackbarMessages.updateUserInfo.error)
      console.error(error)
    }
  }

  const updateAvatar = async (form: UpdateUserAvatarForm) => {
    if (!token) return

    setWholePageLoading(true)
    try {
      await userService.updateCurrentUserAvatar(form, token)
      await mutate()
      router.push(paths.settings)
    } catch (e) {
      snackbar.error(snackbarMessages.updateUserInfo.error)
      console.error(e)
    } finally {
      setWholePageLoading(false)
    }
  }

  const deleteAvatar = () => {
    confirmDialog.open({
      ...dialogMessages.deleteAvatar,
      onConfirm: async () => {
        if (!token) throw new Error('token expired')

        try {
          await userService.deleteCurrentUserAvatar(token)
          await mutate()
        } catch (error) {
          snackbar.error(snackbarMessages.updateUserInfo.error)
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
    if (!data.croppedAvatar)
      user = {
        ...data,
        croppedAvatar: FALLBACK_URL,
        originAvatar: FALLBACK_URL
      }
    else
      user = {
        ...data,
        croppedAvatar: toAbsolutePath(data.croppedAvatar),
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
