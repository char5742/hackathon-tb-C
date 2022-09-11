"use strict";

const { MessageUsecase } = require("../usecase/message");

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on("deleteMessageMyselfEvent", async function (messageId) {
        await MessageUsecase.deleteMessage(messageId);
        const roomId = parseInt(
            Array.from(socket.rooms)
                .filter((e) => e.includes("room"))[0]
                .split(":")[1]
        );
        io.sockets
            .to(`room:${roomId}`)
            .emit("deleteMessageOtherEvent", messageId);
    });
};
