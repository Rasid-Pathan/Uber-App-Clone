const express = require('express');
const router = express.Router();
const {body,query} = require('express-validator');
const { authUser, authCaptain} = require('../middlewares/auth.middleware');
const rideController = require('../controller/ride.controller');

router.post('/create',
    authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid Destination Address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motocycle']).withMessage('Invalid Vehicle Type'),
    rideController.createRide    
)

router.get('/get-fare',
authUser,
query('pickup').isString().isLength({min:3}).withMessage('Invaild Pickup'),
query('destination').isString().isLength({min:3}).withMessage('Invaild Destination'),
rideController.getFare)

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    body('captainId').isMongoId().withMessage('Invalid Captain Id'),
    rideController.confirmRide
)

router.get('/start-ride',authCaptain,
    query('rideId').isMongoId().withMessage('Invalid Ride Id'),
    query('otp').isString().isLength({min:6, max:6}).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride Id'),
    rideController.endRide)

module.exports = router;