"use strict";

const { Socket } = require("socket.io");
/**
 * @param {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 *
 */
const { UserUsecase } = require("../usecase/user");

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on("exitMyselfEvent", async function () {
        const roomId = parseInt(
            Array.from(socket.rooms)
                .filter((e) => e.includes("room"))[0]
                .split(":")[1]
        );
        socket.leave(`room:${roomId}`);
        socket.leave(`${socket.data.userName}:${roomId}`);
        socket.broadcast
            .to(`room:${roomId}`)
            .emit("exitOtherEvent", socket.data.userName);
        await UserUsecase.exitRoom(socket.data.userName, roomId);
    });
    socket.on("disconnecting", async (reason) => {
        const roomId = parseInt(
            Array.from(socket.rooms)
                .filter((e) => e.includes("room"))[0]
                .split(":")[1]
        );
        socket.broadcast
            .to(`room:${roomId}`)
            .emit("exitOtherEvent", socket.data.userName);
        await UserUsecase.exitRoom(socket.data.userName, roomId);
    });
};
