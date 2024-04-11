import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

// コンポーネントのインポート   
import HomeBtn from '../component/HomeBtn'
import HomeBtn_circle from '../component/HomeBtn_circle'

const HomePage = () => {
  // const { profileModal } = useContext(GlobalContext); 
  const history = useNavigate();

  const voicePage = () => {
    console.log("voicePage");
    history("/secret/VoicePage");
  };

  const categoryPage = () => {
    console.log("categoryPage");
    history("/secret/CategoryPage");
  }
  
  return (
    <main className="h-full overflow-y-auto bg-mainBg bg-cover bg-fixed bg-bottom pt-16 md:bg-mainBg_md lg:bg-mainBg_lg">
        <div className='Kaisei Tokumin text-center text-white text-6xl lg:text-8xl drop-shadow-mainShadow mt-20'>言葉の泉</div>
        <div className="flex justify-center items-center mt-28">
          <div className='text-center drop-shadow-mainShadow' onClick={voicePage}><HomeBtn text='新規作成' /></div>
          <HomeBtn_circle position='translate-x-[6.7rem] lg:translate-x-[8.5rem] size-10 bg-[#C5FFF8]' />
          <HomeBtn_circle position='translate-x-36 lg:translate-x-[11.4rem] size-5 bg-[#7BFFEF]' />
        </div>
        <div className="flex justify-center items-center mt-9">
          <div className='text-center drop-shadow-mainShadow' onClick={categoryPage}><HomeBtn text='単語帳' /></div>
          <HomeBtn_circle position='-translate-x-[6.7rem] lg:-translate-x-[8.5rem] size-10  bg-[#C5FFF8]' />
          <HomeBtn_circle position='-translate-x-36 lg:-translate-x-[11.4rem] size-5 bg-[#7BFFEF]' />
        </div>
    </main>
  );
};

export default HomePage;
