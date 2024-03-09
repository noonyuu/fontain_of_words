// homeにあるボタン
import React from 'react'

interface Btnprops {
    text: string;       // ボタンのテキスト
}

const HomeBtn:React.FC<Btnprops> = ({text}) => {
  return (
    <button className='bg-white rounded-3xl text-center w-40 py-2 text-2xl font-bold'>
      {text}
    </button>
  )
}

export default HomeBtn