var flag_speech = 0;
let total_txt = "";

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