import React, { useState, useEffect, useContext } from "react";
// コンテキスト
import { GlobalContext } from "../context/GlobalContext";

interface Btnprops {
  title: string;
  word1: string;
  word2: string;
  func: () => void;
}

const Modal: React.FC<Btnprops> = ({ title, word1, word2, func }) => {
  const { openModal, record, setRecord, setOpenModal } =
    useContext(GlobalContext);

  const closeHandler = () => {
    setOpenModal(false);
    setRecord(record);
  };

  const ClickWord1 = (word: string) => {
    if (word === word2) {
      func();
    } else {
      setOpenModal(false);
      console.log("reccooooood", record);
      setRecord(record);
    }
  };

  useEffect(() => {
    console.log("openModal updated:", openModal);
  }, [record, openModal]);

  return (
    <>
      {openModal && (
        <div className="h-dvh">
          <div className="absolute right-1/2 top-1/2 z-20 h-24 w-60 -translate-y-[50%] translate-x-[50%] rounded-2xl border-2 bg-white">
            <div className="mx-4 my-2 flex text-center">
              <p className="w-full text-center font-bold">{title}</p>
              <button className="font-bold" onClick={closeHandler}>
                ✕
              </button>
            </div>
            <div className="mt-4 flex items-center justify-around">
              <button
                className="w-20 rounded-md border-2 border-black"
                onClick={() => ClickWord1(word1)}
              >
                {word1}
              </button>
              <button
                className="w-20 rounded-md border-2 border-black"
                onClick={() => ClickWord1(word2)}
              >
                {word2}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
