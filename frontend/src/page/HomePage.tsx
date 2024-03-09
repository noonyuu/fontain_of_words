import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Footer from '../component/Footer'
import HomeBtn from '../component/HomeBtn'
import HomeBtn_circle from '../component/HomeBtn_circle'

const HomePage = () => {
  const { profileModal } = useContext(GlobalContext);
  
  return (
    <main
      className={`h-full ${profileModal ?  "bg-gray-200 bg-opacity-50" : "bg-white"} bg-bottom	bg-cover bg-mainBg lg:bg-mainBg_Lg`}>
        <div className='bg-white w-dvw h-[51.97px] lg:h-[70px]'>header</div>
        <div className='Kaisei Tokumin text-center text-white text-5xl lg:text-8xl mt-40 lg:mt-20'>言葉の泉</div>
        <div className='text-center'><HomeBtn text='新規作成' /></div>
        <HomeBtn_circle position='float-right' />
        <div className='mx-auto'><HomeBtn text='単語帳' /></div>
        <div className='absolute bottom-0 h-[25px] w-dvw'><Footer /></div>
    </main>
  );
};

export default HomePage;
      