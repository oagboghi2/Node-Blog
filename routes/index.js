var express = require('express');
var router = express.Router();
const posts = require('../data/helpers/postDb');
const users = require('../data/helpers/userDb');
const tags = require('../data/helpers/tagDb');



const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
    return;
};

const sendUserSuccess = (status, data, res) => {
    res.status(status).json({ data });
    return;
};
// POSTS CRUD/////////////////////////

router.get('/api/posts', (req, res) => {
    posts.get()
        .then(response => {
            sendUserSuccess(201, response, res)
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
            return;
        })
})

router.post('/api/posts', (req, res) => {
    console.log(req.body)
    posts
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

router.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    console.log(id)
    posts.get(id)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
            return;
        })
})


router.put('/api/posts/update/:id', (req, res) => {
    const { id } = req.params;
    const { text, userId } = req.body;
    posts
        .update(id, { text, userId })
        .then(response => {
            console.log(response);
            res.status(201).json(response)
        })
        .catch(error => {
            console.log(error);
        })

})

router.delete('/api/posts/remove/:id', (req, res) => {
    const { id } = req.params;
    posts
        .remove(id)
        .then(response => {
            console.log(response);
            sendUserSuccess(201, "post is successfully deleted", res)
        })
        .catch(error => {
            sendUserError(500, "Failed to delete post", res)
        })
})

// USERS CRUD/////////////////////////


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
    const { id } = req.params;
    console.log(id);
    users.get(id)
        .then(response => {
            sendUserSuccess(201, response, res)
            //console.log(response);
        })
        .catch(error => {
            sendUserError(500, "The post information could not be retrieved.", res)
            return;
        })
})


router.put('/api/users/update/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    users
        .update(id, { name })
        .then(response => {
            console.log(response);
            sendUserSuccess(201, response, res)
        })
        .catch(error => {
            sendUserError(500, "Failed to update user", res);
            return;

        })

})

router.delete('/api/users/remove/:id', (req, res) => {
    const { id } = req.params;
    users
        .remove(id)
        .then(response => {
            console.log(response);
            sendUserSuccess(201, "user is successfully deleted", res)
        })
        .catch(error => {
            sendUserError(500, "Failed to delete user", res);
            return;
        })
})

// TAGS CRUD/////////////////////////

router.get('/api/tags', (req, res) => {
    const { id } = req.params
    console.log(req.params)
    tags
        .get(req.params.id)
        .then(response => {
            sendUserSuccess(201, response, res)
        })
        .catch(error => {
            sendUserError(500, "The tag information could not be retrieved.", res)
            return;
        })
})

router.post('/api/tags', (req, res) => {
    console.log(req.body)
    tags
        .insert(req.body)
        .then(response => {
            //res.json(response)
            sendUserSuccess(201, "Successfully inserted", res);
        })
        .catch(err => {
            sendUserError(500, "The tag information could not be inserted.", res)
            return;
        })
})

router.get('/api/tags/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    tags
        .get(id)
        .then(response => {
            sendUserSuccess(201, response, res)
            //console.log(response);
        })
        .catch(error => {
            sendUserError(500, "The tag information could not be retrieved.", res)
            return;
        })
})


router.put('/api/tags/update/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    tags
        .update(id, req.body)
        .then(response => {
            console.log(response);
            sendUserSuccess(201, response, res)
        })
        .catch(error => {
            sendUserError(500, "Failed to update tag", res);
            return;

        })

})

router.delete('/api/tags/remove/:id', (req, res) => {
    const { id } = req.params;
    tags
        .remove(id)
        .then(response => {
            console.log(response);
            sendUserSuccess(201, "tag is successfully deleted", res)
        })
        .catch(error => {
            sendUserError(500, "Failed to delete tag", res);
            return;
        })
})

module.exports = router;
