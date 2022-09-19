'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // 退室メッセージイベントを送信する
    socket.emit("exitMyselfEvent");
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exitOtherEvent', function (name) {
    // 退室時刻sendDateのフォーマット変換
    const date = new Date();
    const hour = ("00" + date.getHours()).slice(-2);
    const minute = ("00" + date.getMinutes()).slice(-2);
    const date_f = `${hour}:${minute}`;
    
    $("#thread").prepend(
        `<div class='d-inline-flex flex-column rounded-pill p-2 pt-1 mb-3 bg-secondary opacity-50 justify-content-center text-center text-white'>
            <p class="m-0" style="font-size: 0.5em">${date_f}</p>
            <p class="m-0">${name}さんが退室しました。</p>
        </div>`);
    
    // 最新の投稿までスクロールする
    $("#thread_space").animate(
        {scrollTop: $("#thread_space")[0].scrollHeight - $("#thread_space").height()}
    );
    socket.emit("getAllUsernameEvent");
});
