// 保存詳細ページ
import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import { FaPlusSquare } from "react-icons/fa";  // 保存ボタン
import TabBar from '../component/TabBar';
import { useNavigate } from 'react-router-dom';

const SavePage = () => {
  const history = useNavigate();
  return (
    <main>
      <div className='bg-blue-300 w-dvw h-[51.97px] lg:h-[70px]'>header</div>
      <RiArrowGoBackFill className='size-5 lg:size-8 m-4'onClick={() => history(-1)}/>
      <div className='mr-5 ml-7 lg:mr-32 lg:ml-44'><TabBar/></div>
      <div className='absolute bottom-4 right-4 lg:bottom-8 lg:right-8'>
        <button><FaPlusSquare className='size-12 lg:size-16 text-mark' /></button>
      </div>
    </main>
  )
}

export default SavePage
