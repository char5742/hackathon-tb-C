'use strict';

// チャットルームに入室する
function enter() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // ユーザ名が未入力でないかチェックする

    if(userName ===  ''){
        alert('ユーザー名が入力されていません');
        return;
    }

    $('form').submit();
}
