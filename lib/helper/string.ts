// Unicode u+4E00..u+9FFF: CJK Unified Ideographs
// reference:
// 1. https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)
// 2. https://blog.miniasp.com/post/2019/01/02/Common-Regex-patterns-for-Unicode-characters
export const CJKCharacterPattern = /[\u4E00-\u9FFF]/g
export const CJKPattern = /^[\u4E00-\u9FFF\w_.]+$/

/**
 * 1.中文單一字元為一字，標點符號也算一字。
 * 2.英文以單字計算，半形空格為分隔計算一字，ex：Whispering Corner 中間以半形空格分開，總計兩字。
 * 3.半形空格不佔字數，全形空格算一字。
 * 4.半形空格若打超過兩個以上中間未輸入其他字元，則自動縮減為一個半形空格
 * ex：輸入『我是文字       我是後面的文字』中間的半形空格在輸入完成後自動顯示為『我是文字 我是後面的文字』。
 */
export const getCharacterCount = (target: string) => {
  const wholeSpaceCount = (target.match(/[\u3000\u3001-\u303F]/g) || []).length
  const CJKSignCount = (target.match(/[\u3001-\u303F]/g) || []).length
  const enSignCount = (
    target.match(/[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]/g) ||
    []
  ).length
  const fullEnSingCount = (target.match(/[\uFF01-\uFF5E]/g) || []).length

  const CJKCount = (target.match(CJKCharacterPattern) || []).length
  const replaced = target
    .replace(CJKCharacterPattern, ' ')
    .replace(/[\u3000\u3001-\u303F]/g, ' ')
  const enWordCount = (replaced.match(/\w+/g) || []).length

  return (
    CJKCount +
    enWordCount +
    wholeSpaceCount +
    CJKSignCount +
    enSignCount +
    fullEnSingCount
  )
}
