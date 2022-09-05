"use strict";

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const data = $("#message").val();
    $("#message").val("");
    // 投稿内容を送信
    socket.emit("sendMessageEvent", { userName, data });
    return false;
}

// エンターキーで投稿する
$("#message").keydown(function (e) {
    console.log(e.key);
    if (e.ctrlKey) {
        if (e.key === "Enter") {
            publish();
            return false;
        }
    }
});

// サーバから受信した投稿メッセージを画面上に表示する
socket.on(
    "receiveMessageEvent",
    function ({ userName, message, sendDate, messageId }) {
        $("#thread").prepend(
            "<p>" +
                userName +
                ":" +
                message +
                ":" +
                sendDate +
                ":" +
                messageId +
                "</p>"
        );
    }
);
