import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { useForm } from 'react-hook-form'
import { move, update, remove } from 'ramda'
import { Crop } from 'react-image-crop'
import { paths } from 'lib/configs/routes'
import useLocalStorage from 'lib/services/localStorageAdapter'
import usePostEditorService from 'lib/services/postEditorAdapter'
import { CocktailPostDraft, Ingredient, Step } from 'lib/domain/cocktail'
import { EditablePhoto } from 'lib/domain/photo'
import { centerAspectCrop, getCroppedImage } from 'lib/helper/image'
import { CocktailPostForm } from './ports'
import useSnackbar from './ui/useSnackbar'
import useCornerRouter from './useCornerRouter'

const steps = ['step 1', 'step 2', 'step 3']

const defaultIngredients: Ingredient[] = [{ name: '', amount: '' }]
const defaultSteps: Step[] = [{ description: '' }]

const createModeDefaultValues: CocktailPostForm = {
  title: '',
  description: '',
  photos: [],
  ingredients: defaultIngredients,
  steps: defaultSteps
}

const getDefaultCroppedImage = async (src: string): Promise<string> => {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => {
      const crop = centerAspectCrop(img.width, img.height, 4 / 3)
      const pixelCrop: Crop = {
        x: Math.floor(crop.x * img.width * (1 / 100)),
        y: Math.floor(crop.y * img.height * (1 / 100)),
        width: Math.floor(crop.width * img.width * (1 / 100)),
        height: Math.floor(crop.height * img.height * (1 / 100)),
        unit: 'px'
      }
      const result = getCroppedImage(img, pixelCrop)
      resolve(result)
    }
  })
}

const getDefaultValues = (draft?: CocktailPostDraft): CocktailPostForm => {
  if (!draft) return createModeDefaultValues
  const ingredients = draft.ingredients.length
    ? draft.ingredients
    : defaultIngredients
  const steps = draft.steps.length ? draft.steps : defaultSteps
  return {
    title: draft.title,
    description: draft.description,
    photos: draft.photos.map(p => ({
      id: p.id,
      originURL: p.path,
      editedURL: p.path
    })),
    ingredients,
    steps
  }
}

const usePostEditor = (isDraft: boolean, draft?: CocktailPostDraft) => {
  const router = useCornerRouter()
  const { createPost, updatePost, createDraft, updateDraft, toFormal } =
    usePostEditorService()
  const { mutate } = useSWRConfig()
  const storage = useLocalStorage()
  const snackbar = useSnackbar()
  const [activeStep, setActiveStep] = useState<number>(0)
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isDirty }
  } = useForm<CocktailPostForm>({
    defaultValues: getDefaultValues(draft)
  })

  const goBack = () => {
    setActiveStep(prevStep => {
      if (prevStep <= 0) {
        router.back()
        return prevStep
      }
      return prevStep - 1
    })
  }

  const goNext = () => {
    setActiveStep(prevStep => {
      if (prevStep >= steps.length - 1) return prevStep
      return prevStep + 1
    })
  }

  const saveDraft = async () => {
    const token = storage.getToken()
    if (!token) return
    const values = getValues()
    if (draft) {
      await updateDraft(draft.id, values, token)
      mutate(`/cocktail-drafts/${draft.id}`)
    } else {
      await createDraft(values, token)
    }
    mutate('/cocktail-drafts')
    router.push(paths.profile)
    snackbar.success('saved!')
  }

  const handleImageToCover = (index: number) => {
    const values = getValues()
    const currentPhotos = values.photos
    setValue('photos', move(index, 0, currentPhotos))
  }

  const handleImageUpload = async (urls: string[]) => {
    if (urls.length > 5) {
      urls = urls.slice(0, 5)
      snackbar.warning('最多只能上傳五張照片')
    }
    const promiseObjs = urls.map(async url => ({
      originURL: url,
      editedURL: await getDefaultCroppedImage(url)
    }))

    const photos: EditablePhoto[] = await Promise.all(promiseObjs)
    setValue('photos', photos)
  }

  const handleImageEdit = (index: number, url: string) => {
    const values = getValues()
    const currentPhotos = values.photos
    const origin = currentPhotos[index]
    const updated: EditablePhoto = { ...origin, editedURL: url }
    setValue('photos', update(index, updated, currentPhotos))
  }

  const handleImageDelete = (index: number) => {
    const values = getValues()
    const currentPhotos = values.photos
    setValue('photos', remove(index, 1, currentPhotos))
  }

  const onSubmit = async (form: CocktailPostForm) => {
    const token = storage.getToken()
    if (!token) return
    if (isDraft) {
      if (draft) {
        await updateDraft(draft.id, form, token)
        await toFormal(draft.id, token)
        mutate(`/cocktails-drafts/${draft.id}`)
      } else {
        await createPost(form, token)
      }
      mutate('/cocktail-drafts')
    } else {
      if (draft) {
        await updatePost(draft.id, form, token)
        mutate('/cocktails')
        mutate(`/cocktails/${draft.id}`)
      }
    }

    router.push(paths.profile)
    snackbar.success('saved!')
  }

  const submit = handleSubmit(onSubmit)

  return {
    form: { control, isDirty, getValues },
    steps,
    activeStep,
    goBack,
    goNext,
    saveDraft,
    submit,
    handleImageUpload,
    handleImageToCover,
    handleImageEdit,
    handleImageDelete
  }
}

export default usePostEditor
