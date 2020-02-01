const {getAll,create, remove} = require("../model/postcomment");

module.exports = {
    getAllPostCommentByPostid: (req,res)=> {
        const postid = req.params.postid;
        const body = req.body;
        body.postid = postid;
        getAll(body, (err,results) => {
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
    },

    createComment: (req, res) => {
        const body = req.body
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                result: results,
                data: body,
                message: " Comment posted.",
            });
        })
    },

    deleteComment: (req,res) => {
        const id = req.params.id;
        remove(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.json({
                    message: "Something went wrong"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Comment deleted successfully"
            })

        })
    }
}