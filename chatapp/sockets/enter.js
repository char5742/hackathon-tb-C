"use strict";

const { Server } = require("socket.io");
const { UserUsecase } = require("../usecase/user");
/**
 *
 * @param {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io
 */
module.exports = async function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("enterMyselfEvent", async function (name) {
        await UserUsecase.enterRoom(name, 0);
        socket.broadcast.emit("enterOtherEvent", name);
    });
};
