"use strict";
const { Server } = require("socket.io");
const { UserUsecase } = require("../usecase/user");
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
        const existUser = await UserUsecase.getUserAllByRoom(0);
        const usernameList = Array.from(
            new Set(sockets.map((v) => v.data.userName))
        );

        socket.emit("getAllUsernameResponseEvent", {
            offlineList: existUser
                .map((v) => v.name)
                .filter((v) => !usernameList.includes(v)),
            usernameList: usernameList.filter(
                (v) => v !== socket.data.userName
            ),
        });
    });
};
