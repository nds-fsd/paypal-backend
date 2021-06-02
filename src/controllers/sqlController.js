const sql = require('../mysql');


exports.query = (req, res) =>{
  sql.init();

  sql.query('SELECT * FROM user')
    .then((data) => {
        res.status(200).json(data);
    });
}
