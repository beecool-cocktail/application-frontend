import {
  CocktailPostForm,
  CocktailPostCreateForm,
  CocktailPostUpdateForm
} from '../types/cocktail'

export const toCocktailCreateForm = (
  form: CocktailPostForm
): CocktailPostCreateForm => ({
  ...form,
  photos: form.photos.map(p => p.editedURL)
})

export const toCocktailUpdateForm = (
  form: CocktailPostForm
): CocktailPostUpdateForm => ({
  ...form,
  photos: form.photos.map(p => {
    return {
      id: p.id,
      imageFile: p.shouldUploadImageFile ? p.editedURL : undefined
    }
  })
})
