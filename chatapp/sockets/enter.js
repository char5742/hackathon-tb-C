"use strict";
const { UserUsecase } = require("../usecase/user");
module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("enterMyselfEvent", async function (name) {
        socket.broadcast.emit("enterOtherEvent", name + "さんが入室しました。");
    });
};
