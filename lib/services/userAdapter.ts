import { AxiosRequestConfig } from 'axios'
import { UpdateUserAvatarRequest, UpdateUserInfoRequest } from 'sdk'
import {
  UpdateUserAvatarForm,
  UpdateUserInfoForm,
  UserService
} from 'lib/application/ports'
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
    photo: resData.crop_avatar,
    originAvatar: resData.origin_avatar,
    width: resData.width,
    height: resData.height,
    coordinate: resData.coordinate,
    rotation: resData.rotation,
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
    photo: resData.crop_avatar,
    collectionCount: resData.number_of_collection,
    postCount: resData.number_of_post,
    isCollectionPublic: resData.is_collection_public
  }

  return result
}

const updateCurrentUserInfo = async (
  form: UpdateUserInfoForm,
  token: string
) => {
  const req: UpdateUserInfoRequest = {
    name: form.username,
    is_collection_public: form.isCollectionPublic
  }

  await userApi.updateUserInfoRequest(req, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const updateCurrentUserAvatar = async (
  form: UpdateUserAvatarForm,
  token: string
) => {
  const req: UpdateUserAvatarRequest = {
    coordinate: form.coordinate,
    crop_avatar: form.croppedAvatar,
    origin_avatar: form.originAvatar,
    rotation: form.rotation
  }

  await userApi.updateUserAvatarRequest(req, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

const deleteCurrentUserAvatar = async (token: string) => {
  await userApi.deleteUserAvatar({
    headers: { Authorization: `Bearer ${token}` }
  })
}

const userService: UserService = {
  getCurrentUserInfo,
  getOtherUserInfo,
  updateCurrentUserInfo,
  updateCurrentUserAvatar,
  deleteCurrentUserAvatar
}

export default userService
