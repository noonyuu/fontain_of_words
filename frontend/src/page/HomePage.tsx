import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const HomePage = () => {
  const { profileModal } = useContext(GlobalContext);
  
  return (
    <main
      className={`h-full ${profileModal ?  "bg-gray-200 bg-opacity-50" : "bg-white"}`}
    >
      <div>mainだお</div>
    </main>
  );
};

export default HomePage;
