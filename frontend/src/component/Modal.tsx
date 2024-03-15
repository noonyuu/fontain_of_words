// モーダル
import React from 'react'

interface Btnprops {
    word1: string
    word2: string
}

const Modal:React.FC<Btnprops> = ({word1,word2}) => {

  return (
    <div className='relative bg-black opacity-60 w-dvw h-dvh'>
        <div className='absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-60 h-24 bg-white rounded-2xl'>
            <button className='font-bold ml-[220px]' onClick={() => {word1}}>✕</button>
            <div className='flex justify-around items-center mt-3'>
                <button className='border-2 rounded-md border-black w-20'>{word1}</button>
                <button className='border-2 rounded-md border-black w-20'>{word2}</button>
            </div>
        </div>
    </div>
  )
}

export default Modal
