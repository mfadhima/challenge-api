let mysql = require('mysql')

const db = mysql.createConnection(
    {
        user: 'root',
        password: 'password',
        database: 'challenge_jc10',
        host: 'localhost'
    }
)

module.exports = db