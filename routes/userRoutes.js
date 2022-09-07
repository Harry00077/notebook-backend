const express = require("express");
const { registerUser, authUser } = require("../controller/userController");
const {
  checkingLogInData,
  checkingSignUpData,
} = require("../middleware/middleware");

const router = express.Router();

router.post("/signup", checkingSignUpData, registerUser);
router.post("/login", checkingLogInData, authUser);

module.exports = router;
