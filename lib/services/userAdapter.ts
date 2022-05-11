import useSWR from 'swr'
import { GetUserInfoResponse, UpdateUserInfoRequest } from 'sdk'
import { UpdateUserForm, UserService } from 'lib/application/ports'
import { toBase64 } from 'lib/helper/image'
import { User } from 'lib/domain/user'
import { userApi } from './api'

const useUserService = (
  id: number | undefined,
  token: string | null
): UserService => {
  const getKey = () => {
    const user = id ? id : 'current'
    const path = `/users/${user}`
    if (id) return path
    return token ? [path, token] : null
  }

  const {
    data: resData,
    error,
    isValidating,
    mutate
  } = useSWR<GetUserInfoResponse>(getKey)
  const getUserInfo = () => {
    let data: User | undefined
    if (resData) {
      data = {
        id: resData.user_id,
        username: resData.user_name,
        email: resData.email,
        photo: resData.photo,
        collectionCount: resData.number_of_collection,
        postCount: resData.number_of_post,
        isCollectionPublic: resData.is_collection_public
      }
    }
    return { data, error, mutate, isValidating }
  }

  const updateUserInfo = async (form: UpdateUserForm) => {
    if (id) return
    const file = form.file?.[0] && (await toBase64(form.file[0]))
    const req: UpdateUserInfoRequest = {
      file,
      name: form.username,
      is_collection_public: form.isCollectionPublic
    }
    await userApi.updateUserInfoRequest(req, {
      headers: { Authorization: `Bearer ${token}` }
    })
    await mutate()
  }

  return { getUserInfo, updateUserInfo }
}

export default useUserService
