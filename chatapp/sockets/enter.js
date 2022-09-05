"use strict";
<<<<<<< HEAD

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
=======
const { UserUsecase } = require("../usecase/user");
module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on("enterMyselfEvent", async function (name) {
        socket.broadcast.emit("enterOtherEvent", name + "さんが入室しました。");
>>>>>>> 4746ccb16395ee3a675a4801f46339e2c452667d
    });
};
