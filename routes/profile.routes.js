const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controllers")
const authMiddleware = require("../middlewares/auth.mw");

router.get("/userProfile",authMiddleware.validateUser , userController.getProfile );

module.exports = router;