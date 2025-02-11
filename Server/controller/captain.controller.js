const BlacklistToken = require('../model/blacklistToken.model');
const captainModel = require('../model/captain.model');
const {createCaptain} = require('../service/captain.service');
const {validationResult} = require('express-validator');

const registerCaptain = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password,vehicle} = req.body;

    const isCaptainExist = await captainModel.findOne({email});

    if(isCaptainExist){
        return res.status(400).json({message:"Captain already exists"});
    }

    const hashPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
}

const loginCaptain = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }

    const token = await captain.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,captain});
}

const getCaptainProfile = async (req,res,next) => {
    res.status(200).json(req.captain);
}

const logoutCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlacklisted = await BlacklistToken.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }

    await BlacklistToken.create({token});

    res.clearCookie('token');

    res.status(200).json({message:"Logged out successfully"});
}

module.exports = {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain};