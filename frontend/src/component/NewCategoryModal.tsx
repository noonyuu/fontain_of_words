// カテゴリー追加のモーダル
import React, { useState } from 'react'

interface Btnprops {
    name: string
}

const NewCategoryModal:React.FC<Btnprops> = ({name}) => {
  return (
    <div className='absolute text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-36 w-60 border-4 border-mark bg-white rounded-3xl text-xl'>
      <div className='py-2 w-full border-b-2 border-mark'>追加するカテゴリー</div>
      <input className='h-7 w-[80%] my-3 text-sm bg-gray-300 rounded-sm' placeholder={"カテゴリー名の入力"}></input>
      <button className='float-right mr-5 p-1 rounded-md text-base text-white bg-mark'>追加する</button>
    </div>
  )
}

export default NewCategoryModal
