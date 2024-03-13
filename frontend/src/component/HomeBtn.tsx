// homeにあるボタン
import React from 'react'

interface Btnprops {
    text: string;       // ボタンのテキスト
}

const HomeBtn:React.FC<Btnprops> = ({text}) => {
  return (
    <button className='bg-white rounded-full text-center w-40 lg:w-52 py-2 text-2xl lg:text-4xl font-bold'>
      {text}
    </button>
  )
}

export default HomeBtn