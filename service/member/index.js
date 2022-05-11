const {query} = require("../../utils/async-db");

/**
 * 會員模組共用函式
 */
module.exports = {

    /**
     * 判斷此會員是否存在 回傳true 代表 OK false 代表不OK
     *
     * @param {int} memberId        會員編號 0=新增 其餘=會員編號
     * @param {string} account      會員帳號 (如果是會員新增 不可與他人帳號重複)
     *
     * @returns {Promise<{message: string, status: boolean}>}
     */
    accountExist: async(memberId, account) => {

        let result = {
            status: true,
            message: ""
        }

        try {

            //region SQL組成
            let whereFilter = [];
            whereFilter.push(`account = "${account}"`, `deleted_at IS NULL`);
            if (memberId) whereFilter.push(`member_id = ${memberId}`);

            let secureSql = `
                SELECT
                    account
                FROM
                    member
                WHERE
                    ${whereFilter.join(" AND ")}
            `
            //endregion

            let secureResult = await query(secureSql);
            let row = secureResult[0];

            if (memberId) {
                if (!row) throw Error(`帳號不可更換`);
            } else {
                if (row) throw Error(`此帳號已被註冊使用`);
            }

        } catch (err) {
            console.error(err);
            result.status = false;
            result.message = err.message;

        } finally {
            return result;

        }
    },

    mochaTest: async(req) => {

        let result = {
            status: true,
            data: {}
        }

        let number = req.body.number;

        try {

            if (number > 5) throw Error("測試錯誤");

        } catch (err) {
            console.log(err);
            result.status = false;
            result.message = err.message;

        } finally {
            return result;
        }
    }
}