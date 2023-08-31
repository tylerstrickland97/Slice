const { application } = require('express');
const express = require('express');
const json = require('json');


const router = express.router()

router.use(express.json());


/**USER ROUTES */

//current user
router.get('/current', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
})

//login
router.post('/api/v1/login', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//get user by id
router.get('/api/v1/users/:userId', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//add a new user
router.post('/api/v1/users', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//update a user
router.put('/api/v1/users/:userId', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//logout 
router.post('/api/v1/logout', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

/** COURSE ROUTES */

//get courses
router.get('/api/v1/courses', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//get course by ID
router.get('/api/v1//courses/:courseId', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//add a new course
router.post('/api/v1/courses', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//update course information
router.put('/api/v1/courses/:courseId', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

/** ROUND ROUTES */

// get all rounds for a player
router.get('/api/v1/rounds/:playerId', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//add a round 
router.post('/api/v1/rounds', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
})

//edit a round
router.put('/api/v1/rounds/:roundId', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//delete a round
router.delete('/api/v1/rounds/:roundId', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

module.exports = router;





