const express = require('express');
const userRouter = require("./routes/routes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

app.use(userRouter);

app.use((req,res,next) => {
    const error = new Error("Something is wrong");
    error.status = 404;
    next(error);
});

// app.use((error,req,res,next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message,
//         }
//     })
// });

app.listen(8000, () => {
    console.log('Running on port 8000')
});