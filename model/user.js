const pool = require('../config/database');

module.exports = {

    create: (data, callBack) => {
        pool.query(
            `INSERT into users(email,password,username) 
            VALUES(?,?,?,?)`,
            [     
                data.email,
                data.name,
                data.password,
                data.username
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
            `select * from users`, [ ], 
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    fetchOne: (id,callBack) => {
        pool.query(`SELECT name,username,images,description FROM users WHERE id = ?`, [id],
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
            `UPDATE users SET name=?,email=?,password=?,username=?,description=? WHERE id = ? `,
            [
                data.name,
                data.email,
                data.password,
                data.username,
                data.description,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },


    remove: (id,callBack) => {
        pool.query(`DELETE from users WHERE id = ?`,
         [id],
         (error,results,fields) => {
            if(error){
                return callBack(error)
            }
            return callBack(null, results[0])
         }
        );
    },


    findByEmail : (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error,results,fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    }

}