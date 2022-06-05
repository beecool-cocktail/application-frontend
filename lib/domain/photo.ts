export interface Photo {
  id: number
  path: string
}

export interface EditablePhoto {
  id?: number
  originURL: string
  editedURL: string
}

export interface PhotoWithBlur {
  id?: number
  path: string
  blurPath: string
}
