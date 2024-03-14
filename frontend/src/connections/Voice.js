let flag_speech = 0;
let total_txt = "";
let is_connected = false;
let kaiseki_result = null;
let wsconn = null;
let is_first = false;
let is_restart = true;
let recognition = null;
const ws_url = "wss://localhost:8443/app/ws";

export const connect_ws = () => {
  //接続
  wsconn = new WebSocket(ws_url);

  //接続が開いたとき
  wsconn.onopen = function () {
    console.log("websocket connected");
    is_connected = true;

    if (!is_first) {
      return;
    }

    is_first = false;
  };

  //メッセージが来たとき
  wsconn.onmessage = function (event) {
    const result = JSON.parse(event.data)["result"];

    // kaiseki_result?.insertAdjacentHTML("beforeend", result + "<br>");
  };

  //閉じられたとき再接続する
  wsconn.onclose = function () {
    console.log("websocket disconnected");
    is_connected = false;

    connect_ws();
  };
};

export const vr_function = () => {
  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "ja";
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onsoundstart = function () {};
  recognition.onnomatch = function () {};
  recognition.onerror = function () {
    if (flag_speech === 0) {
      //再起する状態なら
      if (is_restart) {
        vr_function();
      }
    }
  };
  recognition.onsoundend = function () {
    if (is_restart) {
      vr_function();
    }
  };

  recognition.onresult = function (event) {
    var results = event.results;

    if (results[0].isFinal) {
      total_txt += results[0][0].transcript;

      //テキストを送信
      wsconn?.send(
        JSON.stringify({
          Text: results[0][0].transcript,
        }),
      );

      //再起する状態なら
      if (is_restart) {
        vr_function();
      }
    } else {
      flag_speech = 1;
    }
  };
  flag_speech = 0;
  const status = document.getElementById("status");
  if (status) status.innerHTML = "start";
  recognition.start();
};

export const Init = () => {
  //Websocket に接続
  connect_ws();
};

export const Start = () => {
  //接続済みなら音声認識開始
  if (is_connected) {
    is_restart = true;
    vr_function();
  }
};

export const Stop = () => {
  //接続済みなら音声認識停止
  is_restart = false;

  //音声認識停止
  recognition?.stop();
};

Init();
