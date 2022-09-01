"use strict";

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("enterMyselfEvent", function (name) {
        socket.broadcast.emit("enterOtherEvent", name + "さんが入室しました。");

    });
};
