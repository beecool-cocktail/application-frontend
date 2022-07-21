import { PhotoWithBlur } from 'lib/domain/photo'

const mockPhotos: PhotoWithBlur[] = [
  {
    path: '/cocktail-1.jpg',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    path: '/cocktail-2.jpg',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    path: '/cocktail-3.jpg',
    blurPath: '/cocktail-blur-1.webp'
  }
]

export const mockBlurPhotos = [
  {
    path: '/cocktail-blur-1.webp',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    path: '/cocktail-blur-2.webp',
    blurPath: '/cocktail-blur-1.webp'
  },
  {
    path: '/cocktail-blur-3.webp',
    blurPath: '/cocktail-blur-1.webp'
  }
]

export const mockFallbackPhotos = [
  {
    path: '/cocktail.jpg',
    blurPath: '/cocktail.jpg'
  }
]

export const mockAvatar = '/avatar.png'

export default mockPhotos
