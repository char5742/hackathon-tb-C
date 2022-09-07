"use strict";

const { Server } = require("socket.io");
/**
 *
 * @param {Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} socket
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io
 */
module.exports = async function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("enterMyselfEvent", function (name) {
        socket.broadcast.emit("enterOtherEvent", name);
    });
};
