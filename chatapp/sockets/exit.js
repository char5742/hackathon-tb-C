"use strict";

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on("exitMyselfEvent", function (name) {
        socket.broadcast.emit("exitOtherEvent", name + "さんが退室しました。");
    });
};
