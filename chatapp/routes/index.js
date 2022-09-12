"use strict";

const express = require("express");
const router = express.Router();

// ログイン画面の表示
router.get("/", function (request, response, next) {
    response.render("index");
});

// サインアップ画面の表示
router.get("/signup", function (request, response, next) {
    response.render("signup");
});

// チャット画面の表示
router.post("/room", function (request, response, next) {
    console.log("ユーザ名：" + request.body.userName);
    response.render("room", { userName: request.body.userName });
});

router.get("/room", function (request, response, next) {
    response.redirect(request.baseUrl + "/");
});

module.exports = router;
