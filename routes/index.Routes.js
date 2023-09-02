const express = require('express');
const router = express.Router();
const userRouter = require("./users.Routes")
// const todosRouter = require('./todos.Routes')

router.use("/auth", userRouter)





module.exports = router;