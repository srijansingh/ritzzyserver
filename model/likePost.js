const pool = require("../config/database");

module.exports = {
     create: (data, callBack) => {
             pool.query(
                 `INSERT into react(userid,postid) VALUES(?,?)`,
                 [
                     data.userid,
                     data.postid
                 ],
                 (error, results, fields) => {
                     if (error) {
                         return callBack(error);
                     }
                     return callBack(null, results)
                 }
             );
         },

         getAll: (data, callBack) => {
             pool.query('SELECT * FROM react WHERE postid = ?', [data.postid],
                 (error, results, fileds) => {
                     if (error) {
                         return callBack(error);
                     }
                     return callBack(null, results)
                 });
         },

         findUserLike : (data, callBack) => {
            pool.query('SELECT * FROM react WHERE postid = ?', [data.postid],
            (error, results, fileds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            });
         },

         remove: (id, callBack) => {
             pool.query(`DELETE from react WHERE id = ?`, [id],
                 (error, results, fields) => {
                     if (error) {
                         return callBack(error)
                     }
                     return callBack(null, results[0])
                 }
             );
         }
}