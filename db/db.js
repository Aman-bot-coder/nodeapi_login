const mysql2 = require('mysql2');

// Create a function to execute SQL queries using a connection pool
async function query(sql, values) {
    const pool = mysql2.createPool({
        host: "localhost",
        user: "root",
        password: "Aman@1234",
        database: "loginaugmentaa",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = { query };