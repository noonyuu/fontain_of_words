import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";

interface ContextWrapperProps {
  children: React.ReactNode;
}

export const ContextWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [profileModal, setProfileModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [record, setRecord] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{id: number; name: string }[]>([]); // カテゴリー選択
  const [bookMarkBool, setBookMark] = useState(false);
  const [words, setWords] = useState<{ word: string; bookmark: boolean }[]>([]);

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
        bookMarkBool,
        setBookMark,
        words,
        setWords,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}