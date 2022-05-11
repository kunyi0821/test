const jwt = require("jsonwebtoken");
const { query } = require("../utils/async-db");

module.exports = {

    /**
     * 產生Token 目前時效性為一天
     * @param {int} member_id
     *
     * @returns {Promise<*>}
     */
    generateToken: async(member_id) => {
        return jwt.sign({member_id}, config.token_secret, {expiresIn: 60 * 60 * 24});
    },

    /**
     * 解析Token 如果沒傳入 Token return
     * @param req
     * @returns {Promise<{data: {}, status: boolean}>}
     */
    verify: async (req) => {

        let result = {
            status: true,
            data: {}
        }

        try {
            let token;

            if (req.headers["authorization"]) {
                token = req.headers["authorization"]
            } else throw Error("請回傳Token");

            let verifyData = jwt.verify(token, config.token_secret);
            let member_id = verifyData.member_id;

            let secureSql = `
                SELECT 
                    member_id
                FROM 
                    member
                WHERE
                    member_id = ? AND deleted_at IS NULL
            `
            let secureResult = await query(secureSql, [member_id]);
            if (secureResult.length === 0) throw Error(`無此帳號`);

            //藉由Token 取得會員編號後 之後直接從這邊存取會員編號
            req.member_id = member_id;

        } catch(err) {
            console.error(err);
            result.status = false;
            result.message = err.message;

        } finally {
            return result
        }
    }
}