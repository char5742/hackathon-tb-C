"use strict";
const { UserUsecase } = require("../usecase/user");
exports.signUp = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("signUpEvent", async function (name) {
        await UserUsecase.signUp(name, "");
        socket.emit("signUpResponseEvent");
    });
};
