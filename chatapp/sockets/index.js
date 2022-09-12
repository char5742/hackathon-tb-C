"use strict";
const { Server } = require("socket.io");
const { getAllUsername } = require("./username");
const { signUp, signIn } = require("./sign");
const { UserUsecase } = require("../usecase/user");
module.exports = function (server) {
    const io = new Server(server);
    io.on("connection", async function (socket) {
        socket.data.userName = socket.handshake.query.name;
        console.log(socket.handshake.query.name);
        // 投稿モジュールの呼出
        require("./publish")(socket, io);

        // 入室モジュールの呼出
        require("./enter")(socket);

        getAllUsername(socket, io);

        // 削除モジュールの呼出
        require("./delete")(socket, io);

        socket.on("disconnect", async (reason) => {
            await UserUsecase.exitRoom(socket.data.userName, 0);
            socket.broadcast.emit(
                "exitOtherEvent",
                socket.data.userName + "さんが退室しました。"
            );
        });
    });

    io.of("/sign").on("connection", async function (socket) {
        signUp(socket);
        signIn(socket);
    });
};
