// 保存詳細ページ
import React from 'react'
import { useNavigate } from "react-router-dom";

// コンポーネントのインポート
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import { FaPlusSquare } from "react-icons/fa";        // 保存ボタン
import TabBar from '../component/TabBar';

const SavePage = () => {

  const history = useNavigate();

  const returnPage = () => {
    console.log("returnPage");
    history("/secret/VoicePage");
  };

  return (
    <main>
      <div onClick={returnPage}><RiArrowGoBackFill className='size-5 lg:size-8 m-4 mt-20' /></div>
      <div className='mr-5 ml-7 lg:mr-32 lg:ml-44'><TabBar/></div>
      <div className='absolute bottom-4 right-4 lg:bottom-8 lg:right-8'>
        <button><FaPlusSquare className='size-12 lg:size-16 text-mark' /></button>
      </div>
    </main>
  )
}

export default SavePage
