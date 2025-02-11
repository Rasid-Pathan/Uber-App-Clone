const dotenv = require('dotenv');
dotenv.config();

const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouters = require('./routes/user.routes');
const captainRouters = require('./routes/captain.routes');
const mapsRouters = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!'))
app.use("/users",userRouters);
app.use("/captains",captainRouters);
app.use("/maps",mapsRouters);
app.use("/rides",rideRoutes);

 
module.exports = app;