const { validationResult } = require('express-validator');
const mapService = require('../service/maps.services');

const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

const getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const data = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: 'Distance and Time not found' });
    }
}

const getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        // console.log(suggestions);
        res.status(200).json({suggestions,message: 'ok'});
    } catch (error) {
        res.status(404).json({ message: 'Suggestions not found' });
    }
}

module.exports = { getCoordinates, getDistanceTime ,getAutoCompleteSuggestions};