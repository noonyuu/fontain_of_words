// 保存詳細ページ
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

// コンポーネントのインポート
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import { FaPlusSquare } from "react-icons/fa";        // 保存ボタン
import TabBar from '../component/TabBar';             // タブ
import NewModal from '../component/NewModal';         // モーダル

const SavePage = () => {

  const history = useNavigate();

  // 前画面に戻る処理
  const returnPage = () => {
    console.log("returnPage");
    history("/secret/VoicePage");
  };

  const HomePage = () => {
    console.log("returnPage");
    history("/secret/HomePage");
  };

  const [btnBool, setBtnBool] = useState(false);

  return (
    <main className="h-[calc(100%-4rem)]">
      <div onClick={returnPage}><RiArrowGoBackFill className='size-5 lg:size-8 m-4 mt-20' /></div>
      {/* <div className='mr-5 ml-7 lg:mr-32 lg:ml-44'><TabBar/></div> */}
      <div className='mr-5 ml-7 lg:mr-32 lg:ml-44 max-h-full'><TabBar/></div>
      <div className='absolute bottom-4 right-4 lg:bottom-8 lg:right-8'>
        <button>
          <FaPlusSquare 
            className='size-12 lg:size-16 text-mark'
            onClick={() => btnBool ? setBtnBool(false) : setBtnBool(true)}
          />
        </button>
      </div>
      <div className={btnBool ? 'z-1' : 'hidden'}>
        <NewModal word1='続ける' word2='終了' next={HomePage} down={()=> setBtnBool(false)}/>
      </div>
    </main>
  )
}

export default SavePage
