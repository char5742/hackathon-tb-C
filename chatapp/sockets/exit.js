"use strict";

const { UserUsecase } = require("../usecase/user");

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on("exitMyselfEvent", async function (name) {
        await UserUsecase.exitRoom(name, 0);
        socket.broadcast.emit("exitOtherEvent", name + "さんが退室しました。");
    });
};
