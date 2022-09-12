"use strict";

// 入室メッセージをサーバに送信する
// ルームIDを取得する
const roomId = 1;
// 入室メッセージイベントを送信する
socket.emit("enterMyselfEvent", roomId);
socket.emit("getAllUsernameEvent");

// サーバから受信した入室メッセージを画面上に表示する
socket.on("enterOtherEvent", function (name) {
    // 入室時刻のフォーマット変換
    const date = new Date();
    const hour = ("00" + date.getHours()).slice(-2);
    const minute = ("00" + date.getMinutes()).slice(-2);
    const date_f = `${hour}:${minute}`;

    $("#thread").prepend(
        `<div class='d-inline-flex flex-column rounded-pill p-2 pt-1 mb-3 bg-secondary opacity-50 justify-content-center text-center text-white'>
            <p class="m-0" style="font-size: 0.5em">${date_f}</p>
            <p class="m-0">${name}さんが入室しました。</p>
        </div>`
    );

    // 最新の投稿までスクロールする
    $("#thread_space").animate({
        scrollTop:
            $("#thread_space")[0].scrollHeight - $("#thread_space").height(),
    });

    socket.emit("getAllUsernameEvent");
});
