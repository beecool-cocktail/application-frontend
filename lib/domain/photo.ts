export interface Photo {
  id: number
  path: string
}

export interface EditablePhoto {
  id?: number
  originURL: string
  editedURL: string
  cropResult?: CropResult
}

export interface PhotoWithBlur {
  id?: number
  path: string
  blurPath: string
}

export interface Coordinate {
  x: number
  y: number
}

export type EditorType = 'change' | 'edit'

export interface CropResult {
  originImage: string // base64 object URL
  croppedImage: string // base64 object URL
  width: number
  height: number
  coordinate: Coordinate[]
  rotation: number
}
