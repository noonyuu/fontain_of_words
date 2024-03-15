// 新しいモーダル
import React from "react";

interface Btnprops {
  word1: string;
  word2: string;
  next: () => void;
  down: () => void;
}

const Modal: React.FC<Btnprops> = ({ word1, word2, next, down }) => {
  const ClickWord1 = (word: string) => {
    if (word === word2) {
      next();
    } else {
      down();
    }
  };

  return (
    <div
      className="absolute top-0 h-dvh w-dvw bg-black opacity-60"
      onClick={() => ClickWord1(word1)}
    >
      <div className="absolute left-[50%] top-[50%] h-24 w-60 -translate-x-[50%] -translate-y-[50%] rounded-2xl bg-white">
        <button
          className="ml-[220px] font-bold"
          onClick={() => ClickWord1(word1)}
        >
          ✕
        </button>
        <div className="mt-3 flex items-center justify-around">
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
  );
};

export default Modal;
