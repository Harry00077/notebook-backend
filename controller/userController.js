const User = require("../model/userModel");
const generateToken = require("../config/generateToken");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    console.log(`User Already Existed`);
    return res.status(400).json({ message: "User Allready Exists" });
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
      `${user.firstname} Registered Successfully with email ${user.email}`
    );
  } else {
    res.statys(400);
    throw new Error("User Not Found");
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: req.body.email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      firstname: user.firstname,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log(`${user.firstname} Signed In Successfully`);
  } else {
    console.log(`Invalid Email or Password`);
    return res.status(401).json({ message: "Invalid Email or Password" });
  }
};

module.exports = { registerUser, authUser };

// try {
//     const hashedPassword = bcrypt.hashSync(req.body.password, 10);

//     const user = await User.create({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

// const authUser = async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//   });

//   if (!user) {
//     res.status(200).json({ message: "User Dosen't Exist" });
//   }

//   const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

//   if (!isValidPassword) {
//     res.status(400).json({ message: "Incorrect Password" });
//   }

//   const token = jwt.sign(
//     { firstname: user.firstname, email: user.email },
//     process.env.JWT_SECRET,
//     { expireIn: "30d" }
//   );

//   res.status(200).json({ message: "Successfully Login", token });
