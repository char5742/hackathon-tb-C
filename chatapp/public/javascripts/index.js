"use strict";

// socket.ioの処理開始
const socket = io("/sign");

// チャットルームに入室する
function enter() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    const password = $("#password").val();
    
    // ユーザ名が未入力でないかチェックする

    if (userName === "") {
        alert("ユーザー名が入力されていません");
        return;
    }
    if (password === "") {
        alert("パスワードが入力されていません");
        return;
    }
    socket.emit("signInEvent", {userName, password});
    socket.on("signInResponseEvent", (user) => {
        console.log(user)
        if (user === null) {
            alert("ユーザー名かパスワードを間違えています");
            return;
        } 
        $("form").submit();
        }
        );
}
