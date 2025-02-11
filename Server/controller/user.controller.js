const userModel = require("../model/user.model");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../model/blacklistToken.model");
const createUser = require("../service/user.service");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({email}).select("+password");
  console.log(user);

  if(!user){
    return res.status(401).json({message:"Invalid email or password"});
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    return res.status(401).json({message:"Invalid email or password"});
  }

  const token = await user.generateAuthToken();

  res.cookie('token', token)

  res.status(200).json({token,user});
};

const getUserProfile = async (req,res,next) => {
  res.status(200).json(req.user);
}

const logoutUser = async (req,res,next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await BlacklistToken.create({token});

  res.status(200).json({message:"Logged out successfully"})
}

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
