const User = require("../model/userModel");
const generateToken = require("../config/generateToken");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    console.log(`Please Enter all the Feilds`);
    return res.status(400).json({ message: "Please Enter all the Feilds" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log(`User already exist`);
    return res.status(400).json({ message: "User already exists!!" });
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });

    console.log(
      `${user.name} Registered Successfully with email ${user.email}!!`
    );
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
    console.log(`${user.name} Signed In Successfully!!`);
  } else {
    console.log(`Invalid Email or Password`);
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
};

module.exports = { registerUser, authUser };
