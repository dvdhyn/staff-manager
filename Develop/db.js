const mysql2 = require('mysql2'); // Importing the mysql2 module to interact with employees_db database

// Creating a pool of connections to the MySQL database
const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees_db'
});

function query(sql, args, callback) {
    // Acquiring a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection error:', err);
            callback(err, null);
            return;
        }
        // Executing the SQL query using the acquired connection
        connection.query(sql, args, (err, results) => {
            connection.release();
            callback(err, results);
        });
    });
}

module.exports = { query };