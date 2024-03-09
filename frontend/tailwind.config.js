/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 使う色
      colors: {
        // main: "#色"
        main: "#00CDB5",
        login: "#87E9F5",
        mark: "#E35D6E"
      },
      backgroundImage: {
        mainBg: "url('./img/mainBack_mobile.png')",
        mainBg_lg: "url('./img/mainBg-lg.png')" ,
        voiceBg: "url('./img/voiceBack.png')",
        voiceBg_lg: "url('./img/voiceBg_lg.png')"
      }
    },
  },
  plugins: [],
};

// tailwindow.configで調べよう