import React from 'react'
import LoginBtn from '../component/loginBtn'
// アイコンのインポート
import { FcGoogle } from "react-icons/fc";          // Google
import { BsDiscord } from "react-icons/bs";         // Discord
import { SiGithub } from "react-icons/si";          // GitHub
import { FaLine } from "react-icons/fa";            // Line
import { IoLogoMicrosoft } from "react-icons/io5";  // Microsoft


const RoginPage = () => {
  return (
    <main>
      <div className='Kaisei Tokumin text-main text-5xl text-center my-[44px]'>言葉の泉</div>
      <div className='Kaisei Tokumin text-[32px] text-center mb-[40px]'>ログイン</div>
      <div className='text-center'>
      <LoginBtn name="Google" icon={<FcGoogle />} />
      <LoginBtn name="Discord" icon={<BsDiscord color="#5865F2"/>} />
      <LoginBtn name="GitHub" icon={<SiGithub />} />
      <LoginBtn name="Line" icon={<FaLine color="#4ECB71"/>} />
      <LoginBtn name="Microsoft" icon={<IoLogoMicrosoft />} />
      </div>
    </main>
  )
}

export default RoginPage