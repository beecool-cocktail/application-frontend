import { AxiosRequestConfig } from 'axios'
import { UpdateUserInfoRequest } from 'sdk'
import { UpdateUserForm, UserService } from 'lib/application/ports'
import { toBase64 } from 'lib/helper/image'
import { User, CurrentUser } from 'lib/domain/user'
import { userApi } from './api'

const getCurrentUserInfo = async (token: string): Promise<CurrentUser> => {
  const config: AxiosRequestConfig = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const res = await userApi.info(config)
  const resData = res.data.data
  const result: CurrentUser = {
    id: resData.user_id,
    username: resData.user_name,
    email: resData.email,
    photo: resData.photo,
    collectionCount: resData.number_of_collection,
    postCount: resData.number_of_post,
    isCollectionPublic: resData.is_collection_public
  }

  return result
}

const getOtherUserInfo = async (id: number): Promise<User> => {
  const res = await userApi.getOtherUserInfo(id)
  const resData = res.data.data
  const result: User = {
    id: resData.user_id,
    username: resData.user_name,
    photo: resData.photo,
    collectionCount: resData.number_of_collection,
    postCount: resData.number_of_post,
    isCollectionPublic: resData.is_collection_public
  }

  return result
}

const updateCurrentUserInfo = async (form: UpdateUserForm, token: string) => {
  const file = form.file?.[0] && (await toBase64(form.file[0]))
  const req: UpdateUserInfoRequest = {
    file,
    name: form.username,
    is_collection_public: form.isCollectionPublic
  }
  await userApi.updateUserInfoRequest(req, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const userService: UserService = {
  getCurrentUserInfo,
  getOtherUserInfo,
  updateCurrentUserInfo
}

export default userService
