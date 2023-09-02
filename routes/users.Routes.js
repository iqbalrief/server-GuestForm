
const express = require('express');
const router = express.Router();
const authToken = require('../middleware')
const indexCtrl = require("../controllers//index.Ctrl");

router.post("/signin", indexCtrl.usersCtrl.signIn);
router.post("/signup", indexCtrl.usersCtrl.signUp);
router.get("/", authToken.verifyToken, indexCtrl.usersCtrl.getAllByAdmin);
router.get("/users", authToken.verifyToken, indexCtrl.usersCtrl.getAllByUsers);
router.post("/newGuest", authToken.verifyToken, indexCtrl.usersCtrl.createByGuest);
router.post("/logout", indexCtrl.usersCtrl.logout);








module.exports = router