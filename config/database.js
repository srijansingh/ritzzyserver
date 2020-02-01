const {createPool} = require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"1230",
    database:"ritzy"

});

module.exports = pool;