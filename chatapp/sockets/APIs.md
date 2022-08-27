# Events

## 入室

入室したことをサーバーに知らせます。

パラメータ:

-   userName: 入室者名

```js
io.emit("enterMyselfEvent", userName);
```

出力 (enterOtherEvent イベント経由) 他の接続している端末全てに送信

```js
"userNameさんが入室しました。";
```

## 退室

退室したことをサーバーに知らせます。

パラメータ:

-   userName: 退室者名

```js
io.emit("exitOtherEvent", userName);
```

出力 (exitOtherEvent イベント経由) 他の接続している端末全てに送信

```js
"userNameさんが退室しました。";
```

## 投稿

メッセージを投稿します。

パラメータ:

-   userName: 送信者名
-   message: 投稿内容（空白でない文字列、空白の場合は出力は空です）

```js
io.emit("exitOtherEvent", { userName, message });
```

出力 (receiveMessageEvent イベント経由) 接続している端末全てに送信

```js
"userName : message";
```
