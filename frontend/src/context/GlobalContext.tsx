import exp from 'constants'
import React from 'react'

// デフォの値
// 値の受け取り方
export const GlobalContext = React.createContext({
  profileModal: false,
  setProfileModal: (value: boolean) => {},

  // ブックマーク(保存する単語)の取得に使用
  bookMarkBool: false,
  setBookMark: (value: boolean) => {},
})
