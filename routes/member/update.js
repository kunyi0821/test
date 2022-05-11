const express = require("express");
const router = express.Router();
let memberUpdate = require("../../service/member/update");

router.post("/update", async function(req, res, next) {

    let apiResult = await memberUpdate(req);

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