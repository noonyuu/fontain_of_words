// ログイン画面ボタンの枠
import React from 'react'

interface Btnprops {
    name: string;
    icon: JSX.Element;
    login: (method: string) => void;
}

const LoginBtn:React.FC<Btnprops> = ({name,icon,login}) => {
  return (
    <div>
      <button
        onClick={() => login(name)}
        className="mt-[20px] h-[31.24px] w-[245px] rounded-[50px] border-[1px] border-solid border-black bg-white lg:mt-[25px] lg:h-[51px] lg:w-[400px]"
      >
        <div className="float-left ml-[5%]	inline-block pt-1 lg:text-[30px]">
          {icon}
        </div>
        <div className="inline-block text-sm lg:pt-2">{name}</div>
      </button>
    </div>
  );
}

export default LoginBtn;
