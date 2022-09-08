"use strict";

// socket.ioの処理開始
const socket = io("/sign");

// サインアップする
function signup() {
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
    socket.emit("signUpEvent", {userName, password});
    socket.on("signUpResponseEvent", (status) => {
        if (status === false) {
            alert("そのユーザー名は使われています");
            return;
        } 
        $("form").submit();
        }
        );
}
