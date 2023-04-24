import { Coordinate } from './photo'

export interface User {
  id: number
  username: string
  photo: string
  collectionCount: number
  postCount: number
  isCollectionPublic: boolean
}

export interface CurrentUser extends User {
  email: string
  originAvatar: string
  width: number
  height: number
  coordinate: Coordinate[]
  rotation: number
}

export interface UpdateUserInfoForm {
  username?: string
  isCollectionPublic?: boolean
}

export interface UpdateUserAvatarForm {
  originAvatar: string // base64 object URL
  croppedAvatar: string // base64 object URL
  coordinate: Coordinate[]
  rotation: number
}

export const getUserIdDisplay = (userId: number) =>
  `#${String(userId).padStart(4, '0')}`
