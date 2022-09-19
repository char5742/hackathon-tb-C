"use strict";

// 休止状態を切り替える
function pause() {
    const state = $('#pause-state').val();
    // 休止状態にする
    if (state === "active") {
        $('#pause-state').val("pause");
        $('#pause-state').html("休止解除");
    }

    // 休止状態を解除する
    else if (state === "pause") {
        $('#pause-state').val("active");
        $('#pause-state').html("一時休止にする");
    }
    
}