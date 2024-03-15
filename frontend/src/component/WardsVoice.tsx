// 単語ごとのdiv
import React, { useEffect } from "react";
import BookMark from "./BookMark";

interface Btnprops {
  word: string;
}

const Wards: React.FC<Btnprops> = ({ word }) => {
  const [wordsList, setWordsList] = React.useState<string[]>([]);

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
            <BookMark bookmark={false} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Wards;
