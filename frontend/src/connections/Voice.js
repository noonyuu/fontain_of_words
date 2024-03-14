var flag_speech = 0;
let total_txt = "";
let is_connected = false;
const kaiseki_result = document.getElementById("kaiseki_result");
let wsconn = null;
let is_first = false;
let is_restart = true;
let recognition = null;
const ws_url = "wss://localhost:8443/app/ws";

export const connect_ws=()=> {
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

    //kaiseki_result.insertAdjacentHTML("beforeend", result + "<br>");
  };

  //閉じられたとき再接続する
  wsconn.onclose = function () {
    console.log("websocket disconnected");
    is_connected = false;

    connect_ws();
  };
}

export const vr_function = () => {
  window.SpeechRecognition =
    window.SpeechRecognition || webkitSpeechRecognition;
  recognition = new webkitSpeechRecognition();
  recognition.lang = "ja";
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onsoundstart = function () {};
  recognition.onnomatch = function () {};
  recognition.onerror = function () {
    if (flag_speech == 0) {
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
      //document.getElementById('result_text').innerHTML = results[0][0].transcript;
      total_txt += results[0][0].transcript;

      //テキストを送信
      wsconn.send(
        JSON.stringify({
          Text: results[0][0].transcript,
        }),
      );

      //再起する状態なら
      if (is_restart) {
        vr_function();
      }
    } else {
      //途中結果表示
      //console.log(total_txt + results[0][0].transcript);
      // document.getElementById('result_text').innerHTML = total_txt + results[0][0].transcript;
      // document.getElementById('result_text').scrollTop = document.getElementById('result_text').scrollHeight;
      flag_speech = 1;
    }
  };
  flag_speech = 0;
  document.getElementById("status").innerHTML = "start";
  recognition.start();
}

export const Init = () =>{
  console.log("init");
  //Websocket に接続
  connect_ws();
}

export const Start = () => {
  //接続済みなら音声認識開始
  if (is_connected) {
    is_restart = true;
    vr_function();
  }
}

export const Stop = () =>{
  //接続済みなら音声認識開始
  is_restart = false;

  //音声認識停止
  recognition.stop();
}

Init();
