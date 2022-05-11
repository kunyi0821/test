const { query , transaction} = require("../../utils/async-db");
const mysql = require("mysql2/promise");

/**
 * 取得會員資訊
 *
 * @param {string} req.member_id    會員編號
 * @returns {Promise<{data: {}, status: boolean}>}
 */
module.exports = async(req) => {

    let result = {
        status: true,
        data: {}
    }


    let member_id = req.member_id;

    const connection = await transaction();
    await connection.beginTransaction();

    try {

        //region todo 可以輸出其他會員相關資訊
        let sSql = `
            SELECT 
                name, 
                account, 
                AES_DECRYPT(password , "${config.password_secret_key}") as password
            FROM 
                member_test
            WHERE
                member_id = ?
        `

        let sResult = await connection.query(sSql, [member_id]);


        // 使用mysql2 套件 會將資料再加一層陣列
        let row = sResult[0][0];

        if (!row) throw Error(`無此會員資料`);
        //解密過後的密碼為buffer格式 需轉字串
        row.password = row.password.toString().replace(/[a-zA-Z0-9]/g, "*");

        result.data = row;

        await connection.commit();


    } catch (err) {
        await connection.rollback();
        console.error(err);
        result.status = false;
        result.message = err.message;

    } finally {
        await connection.release;
        return result;
    }
}