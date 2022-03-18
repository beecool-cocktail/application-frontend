export interface UserInfoBase {
  user_id: number
  user_name: string
}

export interface UserInfo extends UserInfoBase {
  email: string
  photo: string
  number_of_post: number
  number_of_collection: number
  is_collection_public: boolean
}
