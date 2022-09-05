"use strict";

// socket.ioの処理開始
const socket = io("/sign");

// チャットルームに入室する
function enter() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // ユーザ名が未入力でないかチェックする

    if (userName === "") {
        alert("ユーザー名が入力されていません");
        return;
    }
    socket.emit("signUpEvent", userName);
    socket.on("signUpResponseEvent", $("form").submit);
}
