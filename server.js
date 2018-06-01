const express = require('express');
const cors = require('cors');
const posts = require('./data/helpers/postDb');
const users = require('./data/helpers/userDb');
const tags = require('./data/helpers/tagDb');

const server = express();
const port = 5000;
server.use(express.json());
server.use(cors());

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

const sendUserSuccess = (status, data, res) => {
    res.status(status).json({ data });
    return;
};

server.get('/api/posts', (req, res) => {
    const { id } = req.params
    console.log(req.params)
    posts.get(req.params.id)
        .then(response => {
            //res.status(201).json(response)
            sendUserSuccess(201, response, res)
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
            return;
        })
})

server.post('/api/posts', (req, res) => {
    console.log(req.body)
    posts
        .insert(req.body)
        .then(response => {
            //res.json(response)
            sendUserSuccess(201, "Successfully inserted", res);
        })
        .catch(err => {
            res.json(err)
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    console.log(req)
    posts.get({id})
    .then(response => {
        res.status(201).json(response)
        //console.log(response);
    })
    .catch( error =>{
        sendUserError(500, "The post information could not be retrieved.", res)
        return;
    })
})


server.put('/api/posts/update/:id', (req, res)=>{
    const id = req.params;
    const { text, userId } = req.body;
    console.log(posts.update)
    posts
        .update(id, {text, userId})
        .then(response => {
            console.log(response);
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })

})

server.listen(port, () => { console.log(`Backend is in anther castle: ${port}`)});


