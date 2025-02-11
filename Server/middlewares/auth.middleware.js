const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../model/blacklistToken.model");
const captainModel = require("../model/captain.model");

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // console.log(req.headers.authorization?.split(" "));

  if (!token) {
    return res.status(401).json({ message: "Unauthorized No Token" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token: token }); 

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized Blacklisted Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);
    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

const authCaptain = async (req, res, next) => {


  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];


  // const token = req.headers.authorization?.split(/\s+/)[1] || req.cookies.token;
  // console.log(typeof req.headers.authorization);
  // console.log( req.headers.authorization?.split(/\s+/)[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized No Captain Token" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized Blacklisted Captain Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized Captain" });
  }
}

module.exports = {authUser, authCaptain};
