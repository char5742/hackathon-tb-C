"use strict";
const { Server } = require("socket.io");
module.exports = function (server) {
    const io = new Server(server);
    io.on("connection", async function (socket) {
        // 投稿モジュールの呼出
        require("./publish")(socket, io);

        // 入室モジュールの呼出
        require("./enter")(socket, io);

        // 退室モジュールの呼出
        require("./exit")(socket);
    });
};
