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
}
