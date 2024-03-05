// ログイン画面ボタンの枠
import React from 'react'

interface Btnprops {
    name: string;
    icon: any;
}

const loginBtn:React.FC<Btnprops> = ({name,icon}) => {
  return (
    <div>
    <button className='
        rounded-[50px]
        border-solid
        border-2 
        border-black 
        bg-white
        h-[31.24px]
        w-[245px]
        mt-[20px]'
    >
        <div className='inline-block float-left	ml-[5%] pt-[2.5px]'>{icon}</div>
        <div className='inline-block'>{name}</div>
    </button>
    </div>
  )
}

export default loginBtn
