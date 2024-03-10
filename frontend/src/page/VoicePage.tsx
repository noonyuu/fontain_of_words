// 録音ページ
import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";   // 戻るボタン

const VoicePage = () => {
  return (
    // <main className=' bg-voiceBg bg-bottom bg-cover h-dvh w-dvw bg-no-repeat'>
    <main className='bg-voiceBg md:bg-voiceBg_md lg:bg-voiceBg_lg bg-cover bg-bottom h-dvh'>
      <div className='bg-white w-dvw h-[51.97px] lg:h-[70px]'>header</div>
      <RiArrowGoBackFill className='size-5 m-4'/>
      <div className='Kaisei Tokumin text-base'>
        カテゴリー入力
        <input type="text"></input>
      </div>
    </main>
  )
}

export default VoicePage
