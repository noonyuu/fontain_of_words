import React, { useReducer, useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

interface ContextWrapperProps {
  children: React.ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [profileModal, setProfileModal] = useState(false);
  const [bookMarkBool, setBookMark] = useState(false);
  // ↑のブックマーク版

  return (
    <GlobalContext.Provider
      value={{
        profileModal,
        setProfileModal,

        bookMarkBool,
        setBookMark,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}