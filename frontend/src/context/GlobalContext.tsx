import React from 'react'

export const GlobalContext = React.createContext({
  profileModal: false,
  setProfileModal: (value: boolean) => {},
  openModal: false,
  setOpenModal: (value: boolean) => {},
  record: false,
  setRecord: (value: boolean) => {},
})
