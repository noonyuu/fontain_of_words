// 録音後、単語ごとのdiv
import React, { useState, useContext, useEffect } from 'react'
import BookMark from './BookMark'
import { GlobalContext } from "../context/GlobalContext";

interface Btnprops {
    word: string
    selected: boolean
}

const Wards: React.FC<Btnprops> = ({ word, selected }) => {
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
    <li className='flex justify-between h-10 border-b-2 p-1 border-gray-300 text-mark text-xl underline list-none'>
      <div>{word}</div>
      <div className='mx-2' onClick={selected ? () => setBookMark(false) : () => setBookMark(true)}><BookMark bookmark={bookMarkBool}/></div>
      {/* <div className='mx-2' onClick={mark ? () => setMark(false) : () => setMark(true)}><BookMark bookmark={mark}/></div> */}
    </li>
  )
}

export default Wards;
