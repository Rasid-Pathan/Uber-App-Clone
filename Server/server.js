const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const connectToDB = require('./DB/db');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

connectToDB().then(()=>{
    server.listen(port, () => console.log(`server is running on http://localhost:${port}`))
})
