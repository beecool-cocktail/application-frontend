import { useState } from 'react'
import produce from 'immer'
import { join } from 'lib/helper/url'
import { FALLBACK_URL } from 'lib/constants/image'
import useDraftListService from 'lib/services/draftListAdapter'
import useLocalStorage from 'lib/services/localStorageAdapter'
import useConfig from '../hooks/useConfig'

const useDrafts = () => {
  const { getToken } = useLocalStorage()
  const { config, loading: configLoading } = useConfig()
  const { getList, deleteByIds } = useDraftListService()
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isBatchDeleteMode, setBatchDeleteMode] = useState(false)

  const listResult = getList()

  let resData = listResult.data
  const error = listResult.error
  if (resData && config) {
    resData = produce(resData, base => {
      base.data = base.data.map(d => ({
        ...d,
        title: d.title || 'Untitled',
        coverPhotoUrl: d.coverPhotoUrl
          ? join(config.staticBaseUrl, d.coverPhotoUrl)
          : FALLBACK_URL
      }))
    })
  }

  const toggleDeleteMode = () => {
    setBatchDeleteMode(mode => !mode)
    setSelectedIds([])
  }

  const deleteSelected = async () => {
    const token = getToken()
    if (token) await deleteByIds(selectedIds, token)
    setBatchDeleteMode(false)
    setSelectedIds([])
    listResult.mutate()
  }

  const select = (targetId: number, checked: boolean) => {
    if (!checked)
      return setSelectedIds(ids => ids.filter(id => id !== targetId))
    if (selectedIds.includes(targetId)) return
    setSelectedIds(ids => [...ids, targetId])
  }

  return {
    isBatchDeleteMode,
    selectedIds,
    drafts: resData?.data,
    error,
    loading: (!resData && !error) || configLoading,
    toggleDeleteMode,
    select,
    deleteSelected
  }
}

export default useDrafts
