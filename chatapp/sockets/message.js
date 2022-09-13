"use strict";

const { MessageUsecase } = require("../usecase/message");
const { UserUsecase } = require("../usecase/user");

const { Context } = require("./type");
/**
 *
 * @param {Context} socket
 */
exports.getRoomMessage = function (socket) {
    // 投稿メッセージを送信する
    socket.on("getRoomMessageEvent", async function () {
        const roomId = parseInt(
            Array.from(socket.rooms)
                .filter((e) => e.includes("room"))[0]
                .split(":")[1]
        );
        const userName = socket.data.userName;
        const room = await UserUsecase.getUserRoom(userName, roomId);
        const message = await MessageUsecase.getRoomMessage(
            roomId,
            room.created
        );
        socket.emit("getRoomMessageResponseEvent", {
            message: message.map((m) => ({
                userName: m.senderName,
                message: m.data,
                sendDate: m.created,
                messageId: m.id,
            })),
        });
    });
};

exports.getLog = function (socket) {
    // 投稿メッセージを送信する
    socket.on("getLogEvent", async function () {
        const roomId = parseInt(
            Array.from(socket.rooms)
                .filter((e) => e.includes("room"))[0]
                .split(":")[1]
        );
        const userName = socket.data.userName;
        const room = await UserUsecase.getUserRoom(userName, roomId);
        const message = await MessageUsecase.getRoomMessage(
            roomId,
            room.created
        );
        message.forEach((m) => {
            socket.emit("receiveMessageEvent", {
                userName: m.senderName,
                message: m.data,
                sendDate: m.created,
                messageId: m.id,
            });
        });
    });
};
