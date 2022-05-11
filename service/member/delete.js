const { query } = require("../../utils/async-db")

/**
 * 刪除會員資料 可以再加一個API去驗證
 * @param {string} req.member_id     會員編號
 *
 * @returns {Promise<{data: {}, status: boolean}>}
 */
module.exports = async (req) => {


    let result = {
        status: true,
        data: {}
    }
    let member_id = parseInt(req.member_id);

    try {
        let uSql = `
            UPDATE 
                member_test
            SET 
                deleted_at = CURRENT_TIMESTAMP()
            WHERE
                member_id = ?
        `
        let uResult = await query(uSql, [member_id]);

        if (uResult.rowsAffected === 0) throw Error(`刪除失敗`);

    } catch (err) {
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        return result;
    }
}