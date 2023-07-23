import { PhotoWithBlur } from 'lib/domain/photo'

const mockPhotos: PhotoWithBlur[] = [
  {
    id: 1,
    path: '/cocktail-1.jpg',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    id: 2,
    path: '/cocktail-2.jpg',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    id: 3,
    path: '/cocktail-3.jpg',
    blurPath: '/cocktail-blur-1.webp'
  }
]

export const mockBlurPhotos: PhotoWithBlur[] = [
  {
    id: 1,
    path: '/cocktail-blur-1.webp',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    id: 2,
    path: '/cocktail-blur-2.webp',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    id: 3,
    path: '/cocktail-blur-3.webp',
    blurPath: '/cocktail-blur-1.webp'
  }
]

export const mockFallbackPhotos: PhotoWithBlur[] = [
  {
    id: 1,
    path: '/cocktail.jpg',
    blurPath: '/cocktail.jpg'
  }
]

export const mockAvatar = '/avatar.png'

export default mockPhotos
