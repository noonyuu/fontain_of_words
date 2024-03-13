// 録音ボタン
import React from 'react'
import { MdKeyboardVoice } from "react-icons/md";     // 録音アイコン

interface Btnprops {
  voice: boolean
}

const VoiceBtn:React.FC<Btnprops> = ({voice}) => {
  return (
    // false：録音開始ボタン　true：録音中ボタン
    <div>
      {voice
      ?<MdKeyboardVoice className='text-5xl size-16 lg:size-20 text-justify bg-gray-400 rounded-full mt-0'/> 
      :<MdKeyboardVoice className='text-5xl size-16 lg:size-20 text-justify bg-mark rounded-full mt-0'/>}
    </div>
  )
}

export default VoiceBtn
