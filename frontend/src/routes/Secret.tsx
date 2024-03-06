import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Secret = () => {
  // const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/login");
    // }
  }, []);
  return <h1>Secret</h1>;
};

export default Secret;
