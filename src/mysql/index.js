const mysql = require('mysql');

let con;

const init = () => {
    con = mysql.createConnection({
        host: "127.0.0.1",
        user: "user", 
        password: "123456789",
        database: "db"
    });
}

const query = (sql) => {
    return new Promise((resolve, reject) => {
        con.connect((err) => {
          if (err) return reject(err);
          con.query(sql,  (err, result) => {
              if (err) return reject(err);
              return resolve(result);
          });
        });
    });
}

module.exports = {
    init : init,
    query : query
}