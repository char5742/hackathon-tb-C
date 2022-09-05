# Events

## 入室

入室したことをサーバーに知らせます。

パラメータ:

-   userName: 入室者名

```js
socket.emit("enterMyselfEvent", userName);
```

出力 (enterOtherEvent イベント経由) 他の接続している端末全てに送信

```js
userName;
```

## 退室

退室したことをサーバーに知らせます。

パラメータ:

-   userName: 退室者名

```js
socket.emit("exitMyselfEvent", userName);
```

出力 (exitOtherEvent イベント経由) 他の接続している端末全てに送信

```js
"userNameさんが退室しました。";
```

## 投稿

メッセージを投稿します。

パラメータ:

-   userName: 送信者名
-   data: 投稿内容（空白でない文字列、空白の場合は出力は空です）

```js
socket.emit("sendMessageEvent", { userName, data });
```

出力 (receiveMessageEvent イベント経由) 接続している端末全てに送信

```js
{
    userName: "送信者名",
    message: "投稿内容（空白でない文字列、空白の場合は出力は空です）",
    sendDate: "送信日時（サーバー到達時）",
    messageId: "メッセージの固有 ID",
};
```

## 削除

メッセージを削除します。

パラメータ:

-   messageId: メッセージ ID

```js
socket.emit("deleteMessageMyselfEvent", messageId);
```

出力 (deleteMessageOtherEvent イベント経由) 接続している端末全てに送信

```js
messageId;
```

## ユーザー一覧

入室者一覧をサーバーに要求します

```js
socket.emit("getAllUsernameEvent");
```

出力 (getAllUsernameResponseEvent イベント経由) 自端末のみに送信

```js
{
    usernameList: ["接続しているユーザー名"];
}
```
