// 単語ごとのdiv
import React from 'react'
import BookMark from './BookMark'

interface Btnprops {
    word: string
  }

const Wards:React.FC<Btnprops> = ({word}) => {
  return (
    <div className='flex justify-between h-10 border-b-2 p-1 border-gray-300 text-mark text-xl underline'>
      <div>{word}</div>
      <div className='mx-2'><BookMark bookmark={false}/></div>
    </div>
  )
}

export default Wards
