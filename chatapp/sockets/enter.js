"use strict";

const { Server, Socket } = require("socket.io");
const { UserUsecase } = require("../usecase/user");
/**
 *
 * @param {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io
 */
module.exports = async function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("enterMyselfEvent", async function (roomId) {
        socket.join(`room:${roomId}`);
        socket.join(`${socket.data.userName}:${roomId}`);
        await UserUsecase.enterRoom(socket.data.userName, roomId);
        socket.broadcast
            .to(`room:${roomId}`)
            .emit("enterOtherEvent", socket.data.userName);
    });
};
