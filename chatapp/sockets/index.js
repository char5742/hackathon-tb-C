"use strict";
const { Server } = require("socket.io");
const { getAllUsername } = require("./username");
const { signUp, signIn } = require("./sign");
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

        getAllUsername(socket, io);

        // 削除モジュールの呼出
        require("./delete")(socket, io);
    });

    io.of("/sign").on("connection", async function (socket) {
        signUp(socket);
        signIn(socket);
    });
};
