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
        const roomId = parseInt(
            Array.from(socket.rooms)
                .filter((e) => e.includes("room"))[0]
                .split(":")[1]
        );
        const message = await MessageUsecase.sendMessage(
            userName,
            roomId,
            data,
            isMemo
        );
        if (isMemo === true) {
            io.to(`${userName}:${roomId}`).emit("receiveMessageEvent", {
                userName: userName,
                message: message.data,
                sendDate: message.created,
                messageId: message.id,
                isMemo,
            });
        } else {
            io.to(`room:${roomId}`).emit("receiveMessageEvent", {
                userName: userName,
                message: message.data,
                sendDate: message.created,
                messageId: message.id,
            });
        }
    });
};
