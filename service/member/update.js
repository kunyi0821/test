const { query } = require("../../utils/async-db");
const memberFunction = require("./index");

/**
 * 會員資料修改  todo 會員資料修改可以跟會員註冊(member/add)合併成同一支API
 *
 * @param {string} req.member_id                會員編號
 * @param {string} req.body.account             會員帳號
 * @param {string} req.body.password            會員密碼
 * @param {string} req.body.name                會員名稱
 *
 * @returns {Promise<{data: {}, status: boolean}>}
 */
module.exports = async (req) => {

    let result = {
        status: true,
        data: {}
    }

    let member_id = parseInt(req.member_id);

    let rb = req.body;

    let account = rb.account || "";
    let password = rb.password || "";
    let name = rb.name || "";

    try {

        //region 欄位驗證
        if (!account) throw Error(`帳號必須回傳`);
        if (!password) throw Error(`需設定密碼`);
        if (!name) throw Error(`需設定名稱`);
        //endregion


        //region 驗證帳號是否有資料
        let secureResult = await memberFunction.accountExist(member_id, account);
        if (!secureResult.status) throw Error(secureResult.message);
        //endregion

        //region 會員資料 修改
        let uSql = `
            UPDATE 
                member
            SET 
                name = ?, 
                password = AES_ENCRYPT("${password}", "${config.password_secret_key}"),
                updated_at = CURRENT_TIMESTAMP()
            WHERE
                member_id = ? AND account = ?
        `

        let uResult = await query(uSql, [name, member_id, account])
        if (uResult.rowsAffected === 0) throw Error(`會員修改資料失敗`);
        //endregion

    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        return result

    }
}