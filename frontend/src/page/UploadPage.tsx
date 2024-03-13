// テキストアップロードページ
import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン
import VoiceBtn from '../component/VoiceBtn';         // 録音ボタン
import { MdOutlineFileUpload } from "react-icons/md"; // アップロードボタン
import CategoryBox from '../component/CategoryBox';   // カテゴリー選択ボックス

const UploadPage = () => {
  return (
    <main className='bg-blue-300 h-dvh w-dvw'>
      <div className='bg-white w-dvw h-[51.97px] lg:h-[70px]'>header</div>
      <RiArrowGoBackFill className='size-5 m-4'/>
      <div className='Kaisei Tokumin text-base lg:text-lg mx-[10%] lg:mx-16 lg:ml-10 lg:mt-[10%] my-12 lg:float-left'>
        <p>カテゴリー入力</p>
        <CategoryBox elseCategory={false}/>
      </div>
      <input type="text" id="record" className='flex relative mx-[10%] lg:mx-10 my-[5%] w-[80%] lg:w-[65%] h-[60%] lg:h-[50%] rounded-3xl shadow-[inset_0px_6px_2px_rgba(0,4,4,0.25)]'></input>
      <div className='absolute -mt-16 lg:-mt-[15%] right-[6%] lg:right-0 lg:left-24'>
        <MdOutlineFileUpload className='text-5xl size-16 lg:size-20 text-justify bg-mark rounded-full mt-0'/>
      </div> 
    </main>
  )
}

export default UploadPage