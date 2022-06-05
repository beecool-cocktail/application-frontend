import {
  PostArticleRequest,
  PostDraftArticleRequest,
  UpdateDraftArticleRequest,
  UpdateFormalArticleRequest
} from 'sdk'
import { PostEditorService, CocktailPostForm } from 'lib/application/ports'
import { cocktailApi } from './api'

const getCreateReqPayload = async (
  form: CocktailPostForm
): Promise<PostArticleRequest> => ({
  name: form.title,
  ingredient_list: form.ingredients,
  step_list: form.steps,
  description: form.description,
  files: form.photos.map(p => p.editedURL)
})

const getUpdateReqPayload = async (
  form: CocktailPostForm
): Promise<UpdateFormalArticleRequest> => ({
  name: form.title,
  ingredient_list: form.ingredients,
  step_list: form.steps,
  description: form.description,
  photos: form.photos.map(p => ({ id: p.id, path: p.editedURL }))
})

const usePostEditorService = (): PostEditorService => {
  const createPost = async (form: CocktailPostForm, token: string) => {
    const req: PostArticleRequest = await getCreateReqPayload(form)
    await cocktailApi.postArticleRequest(req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const updatePost = async (
    id: number,
    form: CocktailPostForm,
    token: string
  ) => {
    const req: UpdateFormalArticleRequest = await getUpdateReqPayload(form)
    await cocktailApi.updateFormalArticle(id, req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const createDraft = async (form: CocktailPostForm, token: string) => {
    const req: PostDraftArticleRequest = await getCreateReqPayload(form)
    await cocktailApi.postDraftArticleRequest(req, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  const updateDraft = async (
    id: number,
    form: CocktailPostForm,
    token: string
  ) => {
    const req: UpdateDraftArticleRequest = await getUpdateReqPayload(form)
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
