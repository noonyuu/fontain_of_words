import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";

interface ContextWrapperProps {
  children: React.ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [profileModal, setProfileModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [record, setRecord] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>(""); // カテゴリー選択

  return (
    <GlobalContext.Provider
      value={{
        profileModal,
        setProfileModal,
        openModal,
        setOpenModal,
        record,
        setRecord,
        selectedItem,
        setSelectedItem,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}