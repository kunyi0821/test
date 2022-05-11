const { query } = require("../../utils/async-db");
const memberFunction = require("./index");
const {generateToken} = require("../../middleware");

/**
 * 會員註冊 todo 會員註冊可以跟會員修改(member/update)合併成同一支API
 *
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

    let rb = req.body;

    let account = rb.account;
    let password = rb.password;
    let name = rb.name;

    try {
        //region 欄位驗證 驗證格式可以再依照需求客製
        if (account.length < 8 || account.length > 16) throw Error(`帳號必須在8~16字元`);
        if (!password) throw Error(`需設定密碼`);
        if (!name) throw Error(`需設定名稱`);
        //endregion


        //region 驗證帳號是否有重複
        let secureResult = await memberFunction.accountExist(0, account);
        if (!secureResult.status) throw Error(secureResult.message);
        //endregion

        //region 會員資料 新增 todo 密碼加密匯入
        let iSql = `
            INSERT INTO member (name, account, password) 
            VALUES (?, ?, AES_ENCRYPT("${password}", "${config.password_secret_key}")) 
        `

        let iResult = await query(iSql, [name, account]);
        if (iResult.rowsAffected === 0) throw Error(`會員修改資料失敗`);
        let member_id = iResult.insertId;
        //endregion


        //region 註冊及登入 產生token 回拋
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
        return result

    }
}