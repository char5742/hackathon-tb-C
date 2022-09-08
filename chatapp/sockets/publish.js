"use strict";

const { MessageUsecase } = require("../usecase/message");

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on("sendMessageEvent", async function ({ userName, data }) {


        const message = await MessageUsecase.sendMessage(userName, 1, data);
        io.sockets.emit("receiveMessageEvent", {
            userName: userName,
            message: message.data,
            sendDate: message.created,
            messageId: message.id,
        });
    });
};
