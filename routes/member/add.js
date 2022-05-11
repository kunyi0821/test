const express = require("express");
const router = express.Router();
let memberAdd = require("../../service/member/add");

router.post("/add", async function(req, res, next) {

    let apiResult = await memberAdd(req);

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