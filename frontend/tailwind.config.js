/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 使う色
      colors: {
        // main: "#色"
        main: "#00CDB5",
        login: "#87E9F5"
      },
      backgroundImage: {
        mainBg: "url('./img/mainBack_mobile.png')",
        mainBg_Lg: "url('./img/mainBg-lg.png')" 
      }
    },
  },
  plugins: [],
};

// tailwindow.configで調べよう