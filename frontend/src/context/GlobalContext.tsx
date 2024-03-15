import React from 'react'

// デフォの値
// 値の受け取り方
export const GlobalContext = React.createContext({
  profileModal: false,
  setProfileModal: (value: boolean) => {},
  openModal: false,
  setOpenModal: (value: boolean) => {},
  record: false,
  setRecord: (value: boolean) => {},
  selectedItem: "",
  setSelectedItem: (value: string) => {},
  bookMarkBool: false,
  setBookMark: (value: boolean) => {},
})
