const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

const routes = require('./routes/index')

const server = express();
const port = 5000;
server.use(express.json());
server.use(cors());



//next calls the next function the middleware chain.
const log = ( req, res, next) => {
    //console.log("req", req);
    console.log("res", res)
    next();
}

server.use(log);
server.use('/', routes);


server.listen(port, () => { console.log(`Backend is in anther castle: ${port}`)});


