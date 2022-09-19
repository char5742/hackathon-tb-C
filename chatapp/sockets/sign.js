"use strict";
const { UserUsecase } = require("../usecase/user");
exports.signUp = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("signUpEvent", async function ({ userName, password }) {
        try {
            await UserUsecase.signUp(userName, password);
            socket.emit("signUpResponseEvent", true);
            return;
        } finally {
            socket.emit("signUpResponseEvent", false);
        }
    });
};

exports.signIn = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("signInEvent", async function ({ userName, password }) {
        const user = await UserUsecase.signIn(userName, password);
        socket.emit("signInResponseEvent", user);
    });
};
