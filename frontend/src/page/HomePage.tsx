import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Footer from "../component/Footer";

const HomePage = () => {
  const { profileModal } = useContext(GlobalContext);

  return (
    <main
      className={
        // "h-full overflow-y-auto pt-16"
        "h-full overflow-y-auto	bg-mainBg bg-cover bg-fixed bg-bottom pb-[30px] lg:bg-mainBg_Lg"
      }
    >
      <div className="Kaisei Tokumin mt-16 text-center text-5xl text-white lg:text-8xl">
        言葉の泉
      </div>
      {/* <div className="Kaisei Tokumin mt-16 text-center text-5xl text-black drop-shadow-[20px_20px_3px_rgba(255,235,50,255.1)] lg:text-8xl"> */}

      {/* <div className="ellipse"></div> */}
    </main>
  );
};

export default HomePage;
