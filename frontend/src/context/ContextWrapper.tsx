import React, { useReducer, useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

interface ContextWrapperProps {
  children: React.ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [profileModal, setProfileModal] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        profileModal,
        setProfileModal,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}