// 録音ページ
import React from 'react'
import { RiArrowGoBackFill } from "react-icons/ri";

const VoicePage = () => {
  return (
    <main className='bg-voiceBg lg:bg-voiceBg_lg bg-bottom bg-cover h-[100vh]'>
        <div className='bg-gray-600 w-dvw h-[51.97px] lg:h-[70px]'>header</div>  {/** header */}
        <RiArrowGoBackFill className='text-left size-5 m-3'/>
        <div className='bg-white mx-auto mt-72 rounded-lg w-72 h-96'></div>
    </main>
  )
}

export default VoicePage
