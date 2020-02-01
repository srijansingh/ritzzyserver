const {getAll} = require('../model/postuser');

module.exports = {
    getAllPostBySingleUser: (req,res) => {
        const userid = req.params.userid;
        const body = req.body;
        body.userid = userid;
        getAll(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: true,
                data: results
            });
        }) 
    }
}