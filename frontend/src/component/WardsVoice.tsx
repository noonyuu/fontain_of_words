// 単語ごとのdiv
import React, { useContext, useEffect, useState } from "react";
import BookMark from "./BookMark";
import { GlobalContext } from "../context/GlobalContext";

interface Btnprops {
  word: string;
}

const Wards: React.FC<Btnprops> = ({ word }) => {
  const [wordsList, setWordsList] = React.useState<string[]>([]);
  const [mark, setMark] = useState(false);
  const { bookMarkBool, setBookMark } = useContext(GlobalContext);

  useEffect(() => {
    const savedWordsList = JSON.parse(
      localStorage.getItem("wordsList") || "[]",
    );
    setWordsList(savedWordsList);
    console.log(savedWordsList);
  }, []);

  return (
    <>
      {wordsList.map((word) => (
        <div className="flex h-10 justify-between border-b-2 border-gray-300 p-1 text-xl text-mark underline">
          <div>{word}</div>
          <div className="mx-2">
            <div
              className="mx-2"
              onClick={
                bookMarkBool
                  ? () => setBookMark(false)
                  : () => setBookMark(true)
              }
            >
              <BookMark bookmark={bookMarkBool} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Wards;
