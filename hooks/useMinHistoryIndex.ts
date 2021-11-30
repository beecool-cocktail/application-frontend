import { useEffect } from 'react'

const useMinHistoryIndex = () => {
  useEffect(() => {
    let minIndexStr = sessionStorage.getItem('minHistoryIndex')
    let minIndex: number
    if (minIndexStr === null) {
      minIndex = history.length
      sessionStorage.setItem('minHistoryIndex', minIndex.toString())
    }
  }, [])

  if (!history.state) history.replaceState({ index: history.length }, '')

  // const button = document.querySelector('button')
  // if (history.state.index === Number(minIndex)) {
  //   button.disabled = true
  //   button.title = 'Going back once more would take you out of our website'
  // } else button.onclick = evt => history.back()

  // return {
  //   minIndex
  // }
}

export default useMinHistoryIndex
