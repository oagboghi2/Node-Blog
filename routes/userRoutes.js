var express = require('express');
var router = express.Router();
const users = require('./data/helpers/userDb');


const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

const sendUserSuccess = (status, data, res) => {
    res.status(status).json({ data });
    return;
};
//CRUD

router.get('/api/users', (req, res) => {
    const { id } = req.params
    console.log(req.params)
    users.get(req.params.id)
        .then(response => {
            sendUserSuccess(201, response, res)
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
            return;
        })
})

router.post('/api/users', (req, res) => {
    console.log(req.body)
    users
        .insert(req.body)
        .then(response => {
            //res.json(response)
            sendUserSuccess(201, "Successfully inserted", res);
        })
        .catch(err => {
            sendUserError(500, "The post information could not be inserted.", res)
            return;
        })
})

router.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    console.log(req)
    users.get({ id })
        .then(response => {
            res.status(201).json(response)
            //console.log(response);
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
            return;
        })
})


router.put('/api/users/update/:id', (req, res) => {
    const { id } = req.params;
    const { text, userId } = req.body;
    users
        .update(id, { text, userId })
        .then(response => {
            console.log(response);
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })

})

router.delete('/api/users/remove/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(response => {
            console.log(response);
            sendUserSuccess(201, "post is successfully deleted", res)
        })
        .catch(error => {
            sendUserError(500, "Failed to delete post", res)
        })
})

module.exports = router;
