const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '192.168.3.2',
  user: 'root',
  database: 'nodeapp',
  password: 'Sifre123',
});

module.exports = connection.promise();
