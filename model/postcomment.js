const pool = require("../config/database");

module.exports = {
    create: (data,callBack) => {
        pool.query(
            `INSERT into comments(userid,postid,comments) VALUES(?,?,?)`,
            [
                data.userid,
                data.postid,
                data.comments
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },

    getAll: (data,callBack) => {
        pool.query('SELECT * FROM comments WHERE postid = ?', [data.postid],
        (error, results, fileds) =>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results)
        });
    },

    remove: (id, callBack) => {
        pool.query(`DELETE from comments WHERE id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    }
}