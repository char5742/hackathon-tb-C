"use strict";

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const data = $("#message").val();
    console.log(data);
    if ((!data)||!data.match(/\S/g)) {
        $("#message").val("");
        return;
    }
    $("#message").val("");
    // 投稿内容を送信
    socket.emit("sendMessageEvent", { userName, data });
    return false;
}

// エンターキーで投稿する
$("#message").keydown(function (e) {
    console.log(e.key);
    if (e.ctrlKey) {
        if (e.key === "Enter") {
            publish();
            return false;
        }
    }
});

// サーバから受信した投稿メッセージを画面上に表示する
socket.on(
    "receiveMessageEvent",
    function ({ userName, message, sendDate, messageId }) {
        // 投稿時刻sendDateのフォーマット変換
        const date = new Date(Date.parse(sendDate));
        const year = date.getFullYear();
        const month = ("00" + (date.getMonth()+1)).slice(-2); // 月だけ+1する
        const day = ("00" + date.getDate()).slice(-2);
        const hour = ("00" + date.getHours()).slice(-2);
        const minute = ("00" + date.getMinutes()).slice(-2);
        // const second = date.getSeconds();
        const date_f = `${hour}:${minute}`;

        // メッセージが自分のものか
        const isMyMessage = userName === $("#userName").val();
        // const isActive = $("#pause-state").val() === "active"; // 一時休止ボタン実装できるまでコメントアウト
        const isActive = true;
        if (isMyMessage === true || isActive === true) {
            // isMyMessageによってスタイルを変更
            const name_align = isMyMessage ? "text-end" : "text-start";
            const container_align = isMyMessage ? "justify-content-end" : "justify-content-start";
            const color = isMyMessage ? "bg-primary" : "bg-tertiary";

            
            $("#thread").prepend(
                `<div id="${messageId}" class="d-sm-inline-flex ${container_align}">
                    <div class="flex-column">
                        <p class="mb-0 mx-1 ${name_align}" style="font-size: 1em">${userName}</p>
                        <pre class="message-text ${color} rounded p-2 mb-0 text-start opacity-75 text-white">${message}</pre>
                        <p class="${name_align}" style="font-size: 0.5em">${date_f}</p>
                        <div class="message-contextmenu p-1 rounded bg-white"></div>
                        <script>
                            $("#${messageId}").find("pre").contextmenu((e)=>{
                                $(".message-contextmenu").css("left", e.pageX + "px");
                                $(".message-contextmenu").css("top", e.pageY + "px");
                                $(".message-contextmenu").addClass('show');
                                ${isMyMessage} ? $(".message-contextmenu").html('<ul><li onclick="deleteMessage(${messageId})">削除</li></ul>') : $(".message-contextmenu").removeClass('show');
                                return false;
                            });
                        </script>
                    </div>
                </div>`
            );

            // 最新の投稿までスクロールする
            $("#thread_space").animate(
                {scrollTop: $("#thread_space")[0].scrollHeight - $("#thread_space").height()}
            );
        }
        if (isMyMessage === false && isActive === true) {
            const n = new Notification("新しい投稿",{
                body: `${userName} : ${message}`,
                timeout: 5*1000
            });
        }
    }
);

// 左クリックでcontextmenuを非表示にする
$(document).on("click", () => {
    if ($(".message-contextmenu").hasClass('show')) {
        $(".message-contextmenu").removeClass('show');
      }
});