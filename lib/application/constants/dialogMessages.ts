const dialogMessages = {
  login: {
    title: '使用Google帳號登入',
    content: '登入之後即可操作',
    confirmText: '前往登入'
  },
  logout: {
    title: '登出帳號',
    content: '是否確定登出'
  },
  deletePost: {
    title: '刪除發文',
    content: '確定刪除此發文，\n旦刪除將無法復原？',
    primaryButton: 'cancel' as const
  },
  abortCreatePost: {
    title: '放棄發文',
    content: '確定放棄此發文，\n一旦放棄將無法復原？',
    primaryButton: 'cancel' as const
  },
  abortUpdatePostOrDraft: {
    title: '尚未儲存',
    content: '修改內容還沒儲存，\n是否要放棄編輯的內容？',
    primaryButton: 'cancel' as const
  },
  deleteAvatar: {
    title: '刪除大頭貼',
    content: '刪除後會將頭貼改為系統預設圖片'
  },
  networkIssue: {
    title: '無法存取',
    content: '網路似乎出了點狀況...',
    confirmText: '重新整理',
    onlyConfirm: true
  }
}

export default dialogMessages
