"use strict";

const { MessageUsecase } = require("../usecase/message");

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on("deleteMessageMyselfEvent", async function (messageId) {
        await MessageUsecase.deleteMessage(messageId);
        io.sockets.emit("deleteMessageOtherEvent", messageId);
    });
};
