const pool = require('../config/database');

module.exports = {

    create: (data, callBack) => {
        pool.query(
            `INSERT into posts(userid,audioLink,description) 
            VALUES(?,?,?)`,
            [
                data.userid,
                data.audioLink,
                data.description
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },


    getAll: callBack => {
        pool.query(
            `select p.userid, u.name, u.username, u.images, p.pid, p.description, p.audioLink, p.post_created_at FROM users u, posts p WHERE u.id = p.userid`, [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    fetchOne: (pid, callBack) => {
        pool.query(`SELECT * FROM posts WHERE pid = ?`, [pid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },


    update: (data, callBack) => {
        pool.query(
            `UPDATE posts SET description=? WHERE pid = ? `,
            [
                data.description,
                data.pid
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },


    remove: (pid, callBack) => {
        pool.query(`DELETE from posts WHERE pid = ?`,[pid],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    }
}