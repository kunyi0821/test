const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

global.config = require("./config/index");


// 可以在此制定 不需經過 middleware的路徑
// router(app, path.join(__dirname + '/routes'));


//特定路由不須經過驗證 (未登入情況)
const { verify } = require("./middleware/index");
app.use(async function (req, res,next) {

    //console 出 client 端呼叫的路徑
    console.log(`request route: ${config.ip}:${config.port}${req.originalUrl}`)

    if (req.originalUrl === "/member/login" || req.originalUrl === "/member/add") {
        next();

    } else {

        let verifyResult = await verify(req);

        if (verifyResult.status) {
            next();
        } else return res.send(verifyResult)

    }
})

//制定路由
const router = require('folder-router');
router(app, path.join(__dirname + '/routes'));

app.listen(3000, () => {
    console.log("sever is listening on 3000")
})