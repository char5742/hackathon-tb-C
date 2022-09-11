"use strict";

const { Socket } = require("socket.io");
/**
 * @param {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 *
 */
module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on("exitMyselfEvent", function () {
        const roomId = parseInt(
            Array.from(socket.rooms)
                .filter((e) => e.includes("room"))[0]
                .split(":")[1]
        );
        socket.leave(`room:${roomId}`);
        socket.leave(`${socket.data.userName}:${roomId}`);
        socket.broadcast.emit("exitOtherEvent", socket.data.userName);
    });
};
