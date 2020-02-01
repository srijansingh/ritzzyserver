const pool = require('../config/database');

module.exports = {
    getAll: (data, callBack) => {
        pool.query('SELECT * FROM posts WHERE userid = ?', [data.userid],
        (error, results, fields) => {
            if(error){
                return callBack(error)
            }
            return callBack(null, results)
        });
    }
}
