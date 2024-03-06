// ユーザー新規作成ボタン
import React from 'react'

interface Btnprops {
    text: string;
}

const SiteBtn:React.FC<Btnprops> = ({text}) => {
  return (
    <button className='rounded-[50px] bg-login Kaisei Tokumin h-[42px] w-[256px] text-[15px] lg:h-[66px] lg:w-[485px] lg:text-[24px]'>
      {text}
    </button>
  )
}

export default SiteBtn
