import React from "react";
import Header from "./Header";

interface BtnProps {
  m: string;
}

const btn: React.FC<BtnProps> = ({ m }) => {
  return (
    <div>
      <Header />
      <button>
        {m}
        {m}
      </button>
    </div>
  );
};

export default btn;
