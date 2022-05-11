const express = require("express");
const router = express.Router();
let memberLogin = require("../../service/member/login");

router.post("/login", async function(req, res, next) {

    let apiResult = await memberLogin(req);

    if (apiResult.status) {
        res.status(200);
        res.send(apiResult)
    } else {
        res.status(400);
        res.send(apiResult)
    }
})

module.exports = router;
module.exports.root = '/member';