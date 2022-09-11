"use strict";

const { MessageUsecase } = require("../usecase/message");
const { Server } = require("socket.io");
/**
 * @param {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io
 *
 */
module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on("sendMessageEvent", async function ({ data, isMemo }) {
        const userName = socket.data.userName;
        const message = await MessageUsecase.sendMessage(
            userName,
            1,
            data,
            isMemo
        );
        if (isMemo === true) {
            io.to(userName).emit("receiveMessageEvent", {
                userName: userName,
                message: message.data,
                sendDate: message.created,
                messageId: message.id,
                isMemo,
            });
        } else {
            io.sockets.emit("receiveMessageEvent", {
                userName: userName,
                message: message.data,
                sendDate: message.created,
                messageId: message.id,
            });
        }
    });
};
