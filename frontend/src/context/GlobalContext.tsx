import React from "react";

// デフォの値
// 値の受け取り方
export const GlobalContext = React.createContext({
  profileModal: false,
  setProfileModal: (value: boolean) => {},
  openModal: false,
  setOpenModal: (value: boolean) => {},
  record: false,
  setRecord: (value: boolean) => {},
  selectedItem: [] as { id: number; name: string }[],
  setSelectedItem: (value: { id: number; name: string }[]) => {},
  bookMarkBool: false,
  setBookMark: (value: boolean) => {},
  words: [] as { word: string; bookmark: boolean }[],
  setWords: (value: { word: string; bookmark: boolean }[]) => {},
});
