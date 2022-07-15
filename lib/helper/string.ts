/**
 * 1.中文單一字元為一字，標點符號也算一字。
 * 2.英文以單字計算，半形空格為分隔計算一字，ex：Whispering Corner 中間以半形空格分開，總計兩字。
 * 3.半形空格不佔字數，全形空格算一字。
 * 4.半形空格若打超過兩個以上中間未輸入其他字元，則自動縮減為一個半形空格
 * ex：輸入『我是文字       我是後面的文字』中間的半形空格在輸入完成後自動顯示為『我是文字 我是後面的文字』。
 */
// export const getCharacterCount = (target: string) => {
// 1. 計算英文
// const enWords = target.split(' ')
// const enWordCount = enWords.length
// 2. 計算全形空格
// const wholeSpaceCount = target.split(' ').length - 1
// 3. 計算中文
// const CJKCount = wholeSpaceCount
// 處理其他字元
// }

// Unicode u+4E00..u+9FFF: CJK Unified Ideographs
// reference: https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)
export const CJKPattern = /^[\u4E00-\u9FFF\w_.]+$/g
