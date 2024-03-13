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
        mainBg_md: "url('./img/mainBg_md.png')",
        mainBg_lg: "url('./img/mainBg-lg.png')",
        voiceBg: "url('./img/voiceBack.png')",
        voiceBg_md: "url('./img/voiceBack_md.png')",
        voiceBg_lg: "url('./img/voiceBg_lg.png')",
        circle: "url('./img/Ellipse.png')"
      },
      dropShadow: {
        mainShadow: "0px 3px 1px rgba(0,4,4,0.25)"
      }
    },
  },
  plugins: [],
};

// tailwindow.configで調べよう
