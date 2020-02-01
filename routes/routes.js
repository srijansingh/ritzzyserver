const {createUser,getAllUser,getSingleUser,updateSingleUser,deleteUser, loginController} = require("../controller/user");
const {createPost, getAllPost, getSinglePost, updateSinglePost,deletePost} = require("../controller/post");
const {getAllPostBySingleUser} = require('../controller/postuser');
const {getAllPostCommentByPostid, createComment, deleteComment} = require("../controller/postcomment");
const {getAllPostLikeByPostid,createLike,checkLikedPost,deleteLike} = require("../controller/likePost");

const router = require('express').Router();
const {checkToken} = require('../auth/middleware');


//User Routs
router.post('/users',createUser);
router.get('/users',checkToken,getAllUser);
router.get('/users/:id', checkToken, getSingleUser);
router.patch('/users/:id', checkToken, updateSingleUser);
router.delete('/users/:id', checkToken, deleteUser);
router.post('/login', loginController);

//Post Routes
router.post('/posts', checkToken, createPost);
router.get('/posts',checkToken,  getAllPost);
router.get('/posts/:pid', checkToken, getSinglePost);
router.patch('/posts/:pid', checkToken, updateSinglePost);
router.delete('/posts/:pid', checkToken, deletePost);

//All Post by a user
router.get('/posts/users/:userid', checkToken, getAllPostBySingleUser);

//Single Post Comments
router.post('/post/comments', checkToken, createComment);
router.get('/posts/comments/:id', checkToken, deleteComment);
router.get('/posts/:postid/comments', checkToken, getAllPostCommentByPostid);

//React
router.post('/posts/react', checkToken, createLike);
router.delete('/posts/react/:id', checkToken, deleteLike);
router.get('/posts/reacts/:postid', checkToken, getAllPostLikeByPostid);
router.get('/posts/reactlike/:postid', checkLikedPost );

//Follow

module.exports = router;