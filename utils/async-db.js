const mysql = require('mysql')
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                // 執行 sql 腳本對資料庫進行讀寫

                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()  // 結束
                })
            }
        })
    })
}

const mysql2 = require("mysql2/promise");

let transaction = async function () {

    const connection = await mysql2.createConnection(config.db);
    await connection.beginTransaction();

    return connection;
}

module.exports = { query, transaction }