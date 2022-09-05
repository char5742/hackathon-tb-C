"use strict";
const { Server } = require("socket.io");
/**
 * サーバーに接続しているユーザー一覧を送信する
 * sockets.emit getAllUsernameResponseEvent
 * @param {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io
 *
 */
exports.getAllUsername = function (socket, io) {
    socket.on("getAllUsernameEvent", async function () {
        const sockets = await io.fetchSockets();
        socket.emit("getAllUsernameResponseEvent", {
            usernameList: sockets.map((v) => v.data.userName),
        });
    });
};
