const {verify} = require('jsonwebtoken');

module.exports = { 
    checkToken: (req, res, next) => {
        let token = req.get("Authorization");
        if(token){
            token = token.slice(7);
            verify(token, "techronxsupersecret", (err, decoded) => {
                if(err){
                    res.status(500).json({
                        success: false,
                        message: "Invalid Token 500"
                    });
                }
                else{
                    next();
                }
            });
        }
        else{
            res.status(401).json({
                success : false,
                message: "Unauthorised 401"
            });
        }
    }
} 