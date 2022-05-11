const express = require("express");
const router = express.Router();
let memberInfo = require("../../service/member/info");

router.get("/info", async function(req, res, next) {

    let apiResult = await memberInfo(req);

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