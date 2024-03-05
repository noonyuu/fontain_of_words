import React from 'react'
import LoginBtn from '../component/loginBtn'
import TitleName from '../component/TitleName'
// アイコンのインポート
import { FcGoogle } from "react-icons/fc";          // Google
import { BsDiscord } from "react-icons/bs";         // Discord
import { SiGithub } from "react-icons/si";          // GitHub
import { FaLine } from "react-icons/fa";            // Line
import { IoLogoMicrosoft } from "react-icons/io5";  // Microsoft


const RoginPage = () => {
  return (
    <main>
      <TitleName />
      <div>
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