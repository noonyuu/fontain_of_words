import React from 'react'
import { MdKeyboardVoice } from "react-icons/md";     // 録音アイコン
import { MdOutlineFileUpload } from "react-icons/md";

const VoiceBtn = () => {
  return (
    // 録音開始ボタン
    <div>
      <MdKeyboardVoice className='text-5xl size-16 lg:size-20 text-justify bg-gray-400 rounded-full mt-0'/>
    </div>

    // 録音中マーク
    // <div>
    // <MdKeyboardVoice className='text-5xl size-16 lg:size-20 text-justify bg-mark rounded-full mt-0'/>
    // </div>

    // アップロードボタン
    // <div>
    // <MdOutlineFileUpload className='text-5xl size-16 lg:size-20 text-justify bg-mark rounded-full mt-0'/>
    // </div>
  )
}

export default VoiceBtn
