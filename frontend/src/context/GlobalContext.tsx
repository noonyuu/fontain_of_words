import exp from 'constants'
import React from 'react'

export const GlobalContext = React.createContext({
  profileModal: false,
  setProfileModal: (value: boolean) => {},
})
