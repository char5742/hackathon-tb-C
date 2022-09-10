"use strict";

// メッセージを削除する
function deleteMessage(messageId) {
    socket.emit("deleteMessageMyselfEvent", messageId);
}

// メッセージ削除を反映する
socket.on("deleteMessageOtherEvent", (messageId) => {
    // messageIdに該当するメッセージを削除する
    $(`#${messageId}`).remove();
});