"use strict";

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on("sendMessageEvent", function ({ userName, message }) {
        if (!message) {
            return;
        }
        io.sockets.emit("receiveMessageEvent", userName + " : " + message);

    });
};
