// 保存詳細ページ
import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import { FaPlusSquare } from "react-icons/fa";  // 保存ボタン
import TabBar from '../component/TabBar';

const SavePage = () => {
  return (
    <main>
      <div className='bg-blue-300 w-dvw h-[51.97px] lg:h-[70px]'>header</div>
      <RiArrowGoBackFill className='size-5 m-4'/>
      <div className='mr-5 ml-7 lg:mr-32 lg:ml-44'><TabBar/></div>
      <div className='absolute bottom-8 right-8'>
        <button><FaPlusSquare className='size-12 lg:size-16 text-mark' /></button>
      </div>
    </main>
  )
}

export default SavePage
