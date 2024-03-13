// 単語ごとのdiv
import React from 'react'

interface Btnprops {
    word: string
  }

const Wards:React.FC<Btnprops> = ({word}) => {
  return (
    <div className='h-10 border-b-2 p-1 border-gray-300 text-mark text-xl underline'>{word}</div>
  )
}

export default Wards
