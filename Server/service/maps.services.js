const { default: axios } = require("axios");
const captainModel = require('../model/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const url ='https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + process.env.GOOGLE_MAPS_API;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Error in getting location from address');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    console.log(origin , destination);

    if(!origin || !destination) {
        throw new Error('Origin or Destination is missing');
    }

    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destination + '&key=' + process.env.GOOGLE_MAPS_API;

    try {
        const response = await axios.get(url);

        // console.log(response.data.rows);

        if(response.data.status === 'OK') {

            if(response.data.rows[0].elements[0].status === 'NOT_FOUND' || response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('Origin or Destination is not found');
            }

            return response.data.rows[0].elements[0];
        }else {
            throw new Error('Error in getting distance and time');
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input) {
        throw new Error('Input is missing');
    }

    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + input + '&key=' + process.env.GOOGLE_MAPS_API;

    try {
        const response = await axios.get(url);

        // console.log(response.data);

        if(response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Error in getting suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd,lng,radius) => {

    //radius in Km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere:[[ltd,lng],radius/6371]
            }
        }
    });

    return captains;
}