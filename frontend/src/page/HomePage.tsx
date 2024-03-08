// ホーム画面
import React from 'react'
import Footer from '../component/Footer'

const HomePage = () => {
  return (
    <main className='bg-mainBg lg:bg-mainBg_Lg  bg-bottom	bg-cover h-[100vh]'>
        <div className='bg-white w-dvw h-[51.97px] lg:h-[70px]'>header</div>
        <div className='Kaisei Tokumin text-center text-white text-5xl lg:text-8xl mt-40 lg:mt-20'>言葉の泉</div>
        <div className='absolute bottom-0 h-[25px] w-dvw'><Footer /></div>
    </main>
  )
}

export default HomePage
