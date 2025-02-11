const rideService = require('../service/ride.service');
const mapService = require('../service/maps.services');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../model/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup, destination, vehicleType} = req.body;

    console.log(req.body);

    try {
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        res.status(201).json(ride);
        
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const CaptainsInTheRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,5);
        // console.log(CaptainsInTheRadius);

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('user')

        CaptainsInTheRadius.map(captain => {
            console.log('called');
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data: rideWithUser
            })
        })


    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
};

module.exports.getFare = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {pickup,destination} = req.query;

    try {
        const fare = await rideService.calculateFare(pickup,destination);

        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    

    const {rideId} = req.body;

    // console.log(req.captain);

    try {
        const ride = await rideService.confirmRide({rideId,captain: req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

module.exports.startRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId,otp} = req.query;

    try {
        const ride = await rideService.startRide({rideId,otp})        

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

module.exports.endRide = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {rideId} = req.body;
    
    try {

        const ride = await rideService.endRide({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-ended',
            data:ride
        })

        return res.status(200).json(ride);        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message}); 
    }
}