const rideModel = require("../model/ride.model");
const mapService = require("./maps.services");
const crypto = require("crypto");

async function calculateFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination Address are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    motocycle: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    motocycle: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motocycle: 1.5,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (perKmRate.auto * distanceTime.distance.value) / 1000 +
        (perMinuteRate.auto * distanceTime.duration.value) / 60
    ),
    car: Math.round(
      baseFare.car +
        (perKmRate.car * distanceTime.distance.value) / 1000 +
        (perMinuteRate.car * distanceTime.duration.value) / 60
    ),
    motocycle: Math.round(
      baseFare.motocycle +
        (perKmRate.motocycle * distanceTime.distance.value) / 1000 +
        (perMinuteRate.motocycle * distanceTime.duration.value) / 60
    ),
  };

  return fare;
}

function getOTP(num) {
  function generateOTP(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOTP(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {

    // console.log(user,pickup,destination,vehicleType);
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("User, Pickup, Destination and Vehicle Type are required");
  }

  const fare = await calculateFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({rideId, captain}) => {

  // console.log(captain);

  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findByIdAndUpdate(
    {
      _id: rideId,
    },
    { status: "accepted", captain: captain._id }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user").populate('captain').select('+otp');

  if (!ride) {
    throw new Error("Ride not Found");
  }

  return ride;
};

module.exports.startRide = async ({rideId,otp}) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel.findOne({_id: rideId}).populate('captain').populate('user').select('+otp');

  if(!ride){
    throw new Error('Ride not found');
  }

  if(ride.status !== 'accepted'){
    throw new Error('Ride is not accepted');
  }
  
  if(ride.otp !== otp){
    throw new Error('Invalid OTP');
  }
   await rideModel.findByIdAndUpdate({_id:rideId},{status:'ongoing'});

   return ride;
   
}

module.exports.endRide = async ({rideId,captain}) => {
  if(!rideId){
    throw new Error('Ride Id is required');
  }

  const ride = await rideModel.findOneAndDelete({_id:rideId,captain: captain._id}).populate('captain').populate('user');

  if(!ride){
    throw new Error('Ride not found');
  }

  if(!ride.status === 'ongoing'){
    throw new Error('Ride is not ongoing');
  }

  await rideModel.findOneAndUpdate({_id:rideId},{status:'completed'});

  return ride;
}

module.exports.calculateFare = calculateFare;
