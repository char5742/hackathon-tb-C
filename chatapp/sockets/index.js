"use strict";

const { Server } = require("socket.io");
const { signUp } = require("./sign");
module.exports = function (server) {
    const io = new Server(server);
    io.on("connection", async function (socket) {
        socket.data.userName = socket.handshake.query.name;
        // 投稿モジュールの呼出
        require("./publish")(socket, io);

        // 入室モジュールの呼出
        require("./enter")(socket);

        // 退室モジュールの呼出
        require("./exit")(socket);

        // 削除モジュールの呼出
        require("./delete")(socket, io);

        // 退室モジュールの呼出
        require("./exit")(socket);
    });

    io.of("/sign").on("connection", async function (socket) {
        signUp(socket);
    });
};
