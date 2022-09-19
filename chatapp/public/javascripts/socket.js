"use strict";

// socket.ioの処理開始
const socket = io({
    query: {
        name: $("#userName").val(),
    },
});
