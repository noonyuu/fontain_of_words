import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Footer from "../component/Footer";

const HomePage = () => {
  const { profileModal } = useContext(GlobalContext);

  return (
    <main
      className={
        "h-full overflow-y-auto	bg-mainBg bg-cover bg-fixed bg-bottom pt-16 lg:bg-mainBg_Lg"
      }
    >
      <div className="Kaisei Tokumin mt-16 text-center text-5xl text-white lg:text-8xl">言葉の泉</div>
    </main>
  );
};

export default HomePage;
