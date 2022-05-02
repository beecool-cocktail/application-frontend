import { UpdateDraftArticleRequest, UpdateFormalArticleRequest } from 'sdk'
import { PostEditorService, CocktailPostForm } from 'lib/application/ports'
import { toBase64 } from 'lib/helper/image'
import { cocktailApi } from './api'

const getBase64Photos = async (files: FileList | null) => {
  let photos: string[] = []
  if (files) {
    const promiseObjs = Array.from(files).map(toBase64)
    photos = await Promise.all(promiseObjs)
  }
  return photos
}

const getReqPayload = async (form: CocktailPostForm) => {
  const photos = await getBase64Photos(form.photos)
  const payload = {
    name: form.title,
    ingredient_list: form.ingredients,
    step_list: form.steps,
    description: form.description,
    photos,
    files: photos
  }
  return payload
}

const usePostEditorService = (): PostEditorService => {
  const createPost = async (form: CocktailPostForm, token: string) => {
    const req = await getReqPayload(form)
    await cocktailApi.postArticleRequest(req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const updatePost = async (
    id: number,
    form: CocktailPostForm,
    token: string
  ) => {
    const base64Photos = await getBase64Photos(form.photos)
    const req: UpdateFormalArticleRequest = {
      name: form.title,
      description: form.description,
      photos: base64Photos.map(path => ({ path })),
      ingredient_list: form.ingredients,
      step_list: form.steps
    }
    await cocktailApi.updateFormalArticle(id, req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const createDraft = async (form: CocktailPostForm, token: string) => {
    const req = await getReqPayload(form)
    await cocktailApi.postDraftArticleRequest(req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const updateDraft = async (
    id: number,
    form: CocktailPostForm,
    token: string
  ) => {
    const base64Photos = await getBase64Photos(form.photos)
    const req: UpdateDraftArticleRequest = {
      name: form.title,
      description: form.description,
      photos: base64Photos.map(path => ({ path })),
      ingredient_list: form.ingredients,
      step_list: form.steps
    }
    await cocktailApi.updateCocktailDraft(id, req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const toFormal = async (id: number, token: string) => {
    await cocktailApi.makeCocktailDraftToFormal(id, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  return { createPost, updatePost, createDraft, updateDraft, toFormal }
}

export default usePostEditorService
