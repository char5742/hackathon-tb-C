"use strict";

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const data = $("#message").val();
    console.log(data);
    if ((!data)||!data.match(/\S/g)) {
        $("#message").val("");
        return;
    }
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
        if (userName === $("#userName").val() || $("#pause-state").val() === "active") {
            $("#thread").prepend(
                `<p id="${messageId}">` +
                    `${userName}:${message}:${sendDate}:${messageId}` +
                    `<button type='button' onclick='deleteMessage(${messageId})'>削除</button>` +
                `</p>`
            )
        }
        if (userName !== $("#userName").val() && $("#pause-state").val() === "active") {
            
            const n = new Notification("新しい投稿",{
                body: `${userName} : ${message}`,
                timeout: 5*1000
            });
        }
    }
);
