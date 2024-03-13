var flag_speech = 0;
let total_txt = "";
let is_connected = false;

const wsconn = new WebSocket('wss://localhost:8443/app/ws');

wsconn.onopen = function () {
    console.log('websocket connected');
    is_connected = true;

    wsconn.send(
        JSON.stringify({
            "Text": "五言語は、Googleが開発したオープンソースのプログラミング言語です。五話シンプルで効率的な行動を書くことを重視して設計されており、並行処理やネットワーク処理などの機能を覚えています。また、静的型付け言語でありながら、動的片付け言語のような感覚で使える特徴も持っています。プログラミングやWeb serverの開発などに向いており、オークの人によって使われます。"
        })
    );
}

wsconn.onclose = function () {
    console.log('websocket disconnected');
    is_connected = false;
}



function vr_function() {
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onsoundstart = function () {
        document.getElementById('status').innerHTML = "認識中";
    };
    recognition.onnomatch = function () {
        document.getElementById('status').innerHTML = "もう一度試してください";
    };
    recognition.onerror = function () {
        document.getElementById('status').innerHTML = "エラー";
        if (flag_speech == 0)
            vr_function();
    };
    recognition.onsoundend = function () {
        document.getElementById('status').innerHTML = "停止中";
        vr_function();
    };

    recognition.onresult = function (event) {
        var results = event.results;
        for (var i = event.resultIndex; i < results.length; i++) {
            if (results[i].isFinal) {
                //document.getElementById('result_text').innerHTML = results[i][0].transcript;
                total_txt += results[i][0].transcript;
                document.getElementById('result_text').innerHTML = total_txt;
                wsconn.send(
                    JSON.stringify({
                        "Text": results[i][0].transcript
                    })
                );
                vr_function();
            }
            else {
                document.getElementById('result_text').innerHTML = total_txt + results[i][0].transcript;
                document.getElementById('result_text').scrollTop = document.getElementById('result_text').scrollHeight;
                flag_speech = 1;
            }
        }
    }
    flag_speech = 0;
    document.getElementById('status').innerHTML = "start";
    recognition.start();
}