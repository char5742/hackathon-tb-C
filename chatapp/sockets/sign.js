"use strict";
const { UserUsecase } = require("../usecase/user");
exports.signUp = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("signUpEvent", async function (name) {
        try {
            await UserUsecase.signUp(name, "");
            socket.emit("signUpResponseEvent", true);
            return;
        } finally {
            socket.emit("signUpResponseEvent", false);
        }
    });
};
