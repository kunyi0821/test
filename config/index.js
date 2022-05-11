const dotenv = require("dotenv");
dotenv.config();

/**
 * 設定檔案內的各項設定
 */
module.exports = {

    /**
     * 服務位址
     */
    ip: process.env.domain,
    port: process.env.port,

    /**
     * 驗證憑證的密碼
     */
    token_secret: process.env.TOKEN_SECRET,

    /**
     * 資料庫相關資訊
     */
    db: {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_database
    },

    /**
     * 資料庫加密解密
     */
    password_secret_key: process.env.password_secret_key
}