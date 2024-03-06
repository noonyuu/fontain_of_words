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
        md:
        rounded-[50px]
        border-solid
        border-[1px]
        border-black 
        bg-white
        h-[31.24px]
        w-[245px]
        mt-[20px]
        xl:
        '
    >
        <div className='inline-block float-left	ml-[5%] pt-[1%]'>{icon}</div>
        <div className='inline-block text-sm'>{name}</div>
    </button>
    </div>
  )
}

export default loginBtn
