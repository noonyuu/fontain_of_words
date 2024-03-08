import React from 'react'
import LoginBtn from '../component/loginBtn'
import NewAccountBtn from '../component/SiteBtn';
import Footer from '../component/Footer';
// アイコンのインポート
import { FcGoogle } from "react-icons/fc";          // Google
import { BsDiscord } from "react-icons/bs";         // Discord
import { SiGithub } from "react-icons/si";          // GitHub
import { FaLine } from "react-icons/fa";            // Line
import { IoLogoMicrosoft } from "react-icons/io5";  // Microsoft


const LoginPage = () => {
  return (
    <>
    <main>
      <div className='Kaisei Tokumin text-login text-5xl text-center lg:text-left lg:ml-[40px] mt-[44px]'>言葉の泉</div>
      <div className='Kaisei Tokumin text-[32px] text-center my-[40px] lg:my-[20px]'>ログイン</div>
      <div className='text-center'>
        <LoginBtn name="Google" icon={<FcGoogle />} />
        <LoginBtn name="Discord" icon={<BsDiscord color="#5865F2"/>} />
        <LoginBtn name="GitHub" icon={<SiGithub />} />
        <LoginBtn name="Line" icon={<FaLine color="#4ECB71"/>} />
        <LoginBtn name="Microsoft" icon={<IoLogoMicrosoft />} />
      </div>
      <div className='text-center mt-[120px] lg:my-[50px]'>
        <NewAccountBtn text='アカウントの新規登録はこちらから' />
      </div>
    </main>
    <footer className='absolute bottom-0 h-[25px] w-dvw'>
      <Footer />
    </footer>
    </>
  )
}

export default LoginPage