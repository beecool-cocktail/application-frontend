import useSWR from 'swr'
import { FALLBACK_URL } from 'lib/application/constants/image'
import userService from 'lib/services/userAdapter'
import { UpdateUserAvatarForm } from 'lib/application/types/user'
import dialogMessages from 'lib/application/constants/dialogMessages'
import snackbarMessages from 'lib/application/constants/snackbarMessages'
import { paths } from 'lib/application/configs/routes'
import useAuth from '../auth/useAuth'
import useConfig from '../useConfig'
import useConfirmDialog from '../ui/useConfirmDialog'
import useWholePageSpinner from '../ui/useWholePageSpinner'
import useCornerRouter from '../useCornerRouter'
import useErrorHandler from '../useErrorHandler'

const FETCH_KEY = 'CURRENT_USER'

const useCurrentUser = () => {
  const { handleError } = useErrorHandler()
  const confirmDialog = useConfirmDialog()
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
      handleError(error, {
        snackbarMessage: snackbarMessages.updateUserInfo.error
      })
    }
  }

  const updateUsername = async (username: string) => {
    if (!token) return

    try {
      await userService.updateCurrentUserInfo({ username }, token)
      await mutate()
      router.back(paths.settings)
    } catch (error) {
      handleError(error, {
        snackbarMessage: snackbarMessages.updateUserInfo.error
      })
    }
  }

  const updateAvatar = async (form: UpdateUserAvatarForm) => {
    if (!token) return

    setWholePageLoading(true)
    try {
      await userService.updateCurrentUserAvatar(form, token)
      await mutate()
      router.back(paths.settings)
    } catch (error) {
      handleError(error, {
        snackbarMessage: snackbarMessages.updateUserInfo.error
      })
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
          handleError(error, {
            snackbarMessage: snackbarMessages.updateUserInfo.error
          })
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
