const {create, getAll,findUserLike, remove} = require("../model/likePost");

module.exports = {
    getAllPostLikeByPostid: (req, res) => {
            const postid = req.params.postid;
            const body = req.body;
            body.postid = postid;
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
        },

    checkLikedPost: (res,req) => {
        const postid = req.params.postid;
        // const userid = req.params.userid;
        const body = req.body;
        body.postid = postid;
        // body.userid = userid;
        findUserLike(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!results) {
                    return res.json({
                        success: false,
                        message: "Record not available"
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: results
                });
            })
        },

        createLike: (req, res) => {
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
                    message: "Reacted successfully",
                });
            })
        },

        deleteLike: (req, res) => {
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
                    message: "React removed successfully"
                })

            })
        }
}