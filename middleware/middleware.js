const checkingSignUpData = (req, res, next) => {
  if (!req.body.firstname) {
    res.status(400).json({ message: "First Name is Required" });
  }
  if (!req.body.lastname) {
    res.status(400).json({ message: "Last Name is Required" });
  }
  if (!req.body.email) {
    res.status(400).json({ message: "Email is Required" });
  }
  if (!req.body.password) {
    res.status(400).json({ message: "Password is Requied" });
  }
  next();
};

const checkingLogInData = (req, res, next) => {
  if (!req.body.email) {
    res.status(400).json({ message: "Email is Required" });
  }
  if (!req.body.password) {
    res.status(400).json({ message: "Password is Required" });
  }
  next();
};

module.exports = { checkingSignUpData, checkingLogInData };
