export const FALLBACK_URL = '/cocktail.jpg'

const rotateMarks = [-180, -90, 0, 90, 180].map(value => ({
  value,
  label: `${value}°`
}))

export const EDIT_CONFIG = {
  scale: {
    min: 1,
    max: 3,
    step: 0.1
  },
  rotation: {
    min: -180,
    max: 180,
    marks: rotateMarks,
    step: 90
  }
}
