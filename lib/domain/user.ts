import { Coordinate } from './photo'

export interface User {
  id: number
  username: string
  croppedAvatar: string
  collectionCount: number
  postCount: number
  isCollectionPublic: boolean
}

export interface CurrentUser extends User {
  isDefaultAvatar: boolean
  email: string
  originAvatar: string
  width: number
  height: number
  coordinate: Coordinate[]
  rotation: number
}

export const getUserIdDisplay = (userId: number) =>
  `#${String(userId).padStart(4, '0')}`
