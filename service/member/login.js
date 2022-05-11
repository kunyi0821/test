const { query } = require("../../utils/async-db");
const {generateToken} = require("../../middleware/index");

/**
 * 會員登入
 *
 * @param {string} req.body.account         會員帳號
 * @param {string} req.body.password        會員密碼
 *
 * @returns {Promise<{data: {}, status: boolean}>}
 */
module.exports = async (req) => {

    let result = {
        status: true,
        data: {}
    }

    let rb = req.body;
    let account = rb.account;
    let password = rb.password;

    try {
        //region 欄位驗證
        if (!account) throw Error(`需輸入帳號`);
        if (!password) throw Error(`需輸入密碼`);
        //endregion

        let sSql = `
            SELECT
                member_id, 
                account, 
                AES_DECRYPT(password , "${config.password_secret_key}") as password
            FROM 
                member_test
            WHERE 
                account = ? AND deleted_at IS NULL
        `

        let sResult = await query(sSql, [account]);
        let row = sResult[0];

        if (sResult.length === 0) {
            throw Error(`無此帳號資料`);

        } else {
            //解密後的密碼為buffer格式需轉字串
            if (row.password.toString() !== password) throw Error(`密碼輸入錯誤`);

        }

        let member_id = row.member_id;

        //region 產生token 回拋
        let token = await generateToken(member_id);

        result.data = {
            token
        }
        //endregion

    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        return result;
    }
}