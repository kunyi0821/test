const express = require("express");
const router = express.Router();
let memberDelete = require("../../service/member/delete");

router.delete("/", async function(req, res, next) {

    let apiResult = await memberDelete(req);

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