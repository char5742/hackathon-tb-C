"use strict";

// ユーザ一覧を取得する
socket.on("getAllUsernameResponseEvent", ({ usernameList, offlineList }) => {
    $(".user_list").empty();
    for (const userName of offlineList) {
        $(".user_list").prepend(
            `<div class='d-flex direction-col align-items-center my-3'> <div class='rounded-circle bg-neutral mx-3' style="width: 1rem; height: 1rem"></div><p class='fs-5 m-0'>${userName}</p></div>`
        );
    }
    for (const userName of usernameList) {
        $(".user_list").prepend(
            `<div class='d-flex direction-col align-items-center my-3'> <div class='rounded-circle bg-primary mx-3' style="width: 1rem; height: 1rem"></div><p class='fs-5 m-0'>${userName}</p></div>`
        );
    }
});
