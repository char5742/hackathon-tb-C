"use strict";

// ユーザ一覧を取得する
socket.on("getAllUsernameResponseEvent", ({ usernameList }) => {
    $("#thread").prepend("<p>現在の入室者は" + usernameList + "です。</p>");
});
