// 単語帳の単語
import React from 'react'
import { FaChevronRight } from "react-icons/fa";

interface Btnprops {
    word: string
}

const WardsDictionary:React.FC<Btnprops> = ({word}) => {
  return (
    <div>
        <div className='flex justify-between items-center h-10 border-b-[1px] border-gray-300 text-xl px-8 underline'>
            <div>{word}</div>
            <button className='mx-2'><FaChevronRight className='text-gray-300'/></button>
        </div>
    </div>
  )
}

export default WardsDictionary
