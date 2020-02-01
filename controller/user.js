const { create, getAll, fetchOne, update, remove, findByEmail } = require("../model/user");
const { genSaltSync,hashSync, compareSync} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
module.exports = {

    //Create User 
    createUser: (req,res) => {
        let body = req.body;
        const salt = genSaltSync(10);
        const username = req.body.email.split('@')[0];
        body.username = username;
        body.password = hashSync(body.password, salt);
        create(body, (err,results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message : "Database connection error"
                });
            }
            return res.status(200).json({
                result:results,
                data: body,
                message: "Registered successfully, username is "+ body.username
            });
        });
    },


    //Get All User
    getAllUser: (req,res) => {
        getAll((err,results) =>{
            if(err){
                console.log(err)
                return;
            }
            return res.json({
                data: results
            });
        });
    },

    //Get Single User
    getSingleUser: (req,res) => {
        const id = req.params.id;
        fetchOne(id, (err,results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success : false,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success : true,
                data: results
            });
        });
    },


    //Update Users Information
    updateSingleUser: (req,res) => {
        const id = req.params.id;
        const body = req.body;
        const salt = genSaltSync(10);
        body.id = id;
        body.password = hashSync(body.password, salt);
        update(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Server Side Connection Error"
                });
            }
            return res.status(200).json({
                success : true,
                message: "User data updated successfully"
            });
        });
    },

    deleteUser: (req,res) => {
        const id= req.params.id;
        remove(id, (err,results) => {
            if(err){
                console.log(err);
                return res.json({
                    message: "Something Went Wrong"
                });
            }
            return res.status(200).json({
                success: true,
                message: "User Deleted Duccessfully"
            })
            
        })
    },

    loginController: (req, res) => {
        const body = req.body;
        findByEmail(body.email, (err,results) => {
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    success : 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({ userID: results.id, userEmail: results.email, result:results }, "techronxsupersecret", { expiresIn : "1000h"});
                return res.status(200).json({
                    success : 1,
                    message: "Login Successfully",
                    token: jsontoken,
                    userId: results.id,
                    userEmail: results.email
                });
            }else{
                return res.json({
                    success : false,
                    data: "Invalid Email or Password"
                });
            }
        })
    }
}