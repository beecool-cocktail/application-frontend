import { Coordinate } from 'lib/domain/photo'

export interface UpdateUserAvatarForm {
  originAvatar: string // base64 object URL
  croppedAvatar: string // base64 object URL
  coordinate: Coordinate[]
  rotation: number
}

export interface UpdateUserInfoForm {
  username?: string
  isCollectionPublic?: boolean
}
