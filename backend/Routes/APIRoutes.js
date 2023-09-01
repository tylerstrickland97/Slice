const { application } = require('express');
const express = require('express');
const json = require('json');


const apiRouter = express.Router();

apiRouter.use(express.json());

const db = require('../db.js');
const User = require('../Models/User');
const Course = require('../Models/Course');
const Round = require('../Models/Round');


/**USER ROUTES */

//current user
apiRouter.get('/current', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
})

//login
apiRouter.post('/login', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

//get user by username
apiRouter.get('/api/v1/users/:username', (req, res) => {
    username = req.params.username;
    db.findUserByUsername(username).then(data => {
        if (data.length > 0) {
            res.status(200).json({data: data});
        }
        else {
            res.status(400).json({msg: "Unable to retrieve data"});
        }
    })
});

//add a new user
apiRouter.post('/api/v1/users', (req, res) => {
    data = req.body;
    let user;
    try {
        user = new User(data);
    } catch (err) {
        res.status(400).json({error: err});
    }

    if (db.addNewUser(user)) {
        res.status(200).json({msg: "Successfully added new User"});
    }
    else {
        res.status(400).json({error: "Was unable to add new User"});
    }
});

//update a user
apiRouter.put('/api/v1/users/:username', (req, res) => {
    //First make sure that there is currently a User in the Firebase with the given username
    let username = req.params.username;
    let userToUpdate;
    db.findUserByUsername(username).then(result => {
        if (result == null) {
            res.status(400).json({error: "There is no user with the given username"});
        }
        else {
            userToUpdate = result[0];
        }
    });

    let updatedUser;
    let data = req.body;
    try {
        updatedUser = new User(data);
        if (db.addNewUser(updatedUser)) {
            res.status(200).json({msg: "Successfully added new User"});
        }
        else {
            res.status(400).json({err: "Unable to edit User"});
        }
    } catch (err) {
        res.status(400).json({err: "Invalid data object"});
    }
});

//logout 
apiRouter.post('/api/v1/logout', (req, res) => {
    res.status(400).json({msg: "Not yet implemented"});
});

/** COURSE ROUTES */

//get courses
apiRouter.get('/api/v1/courses', (req, res) => {

    db.getCourses.then(courses => {
        res.status(200).json({data: courses});
    });
});

//get course by name
apiRouter.get('/api/v1//courses/:name', (req, res) => {

    let name = req.params.name;
    db.getCourseByName(name).then(courses => {
        res.status(200).json({data: data});
    });
});

//add a new course
apiRouter.post('/api/v1/courses', (req, res) => {
    let data = req.body;
    try {
        let course = new Course(data);
        if (db.addCourse(course)) {
            res.status(200).json({msg: "Successfully added course"});
        }
        else {
            res.status(400).json({error: "Unable to add course"});
        }
    } catch (err) {
        res.status(400).json({error: err});
    }
});

//update course information
apiRouter.put('/api/v1/courses/:courseName', (req, res) => {
    let name = req.params.courseName;

    db.getCourseByName(name).then(response => {
        if (response.length == 0) {
            res.status(400).json({err: "Unable to find course with given name"});
        }
    });
    let data = req.body;
    try {
        let updatedCourse = new Course(data);
        if (db.addCourse(updatedCourse)) {
            res.status(200).json({msg: "Successfully updated course"});
        }
        else {
            res.status(400).json({err: "Unable to update course"});
        }
    } catch (err) {
        res.status(400).json({err: err});
    }
});

/** ROUND ROUTES */

// get all rounds for a player
apiRouter.get('/api/v1/rounds/:username', (req, res) => {
    let name = req.params.username;
    db.findUserByUsername(name).then(matches => {
        if (matches.length == 0) {
            res.status(400).json({err: "Unable to find rounds for player with the given name"});
        }
    });

    db.getRoundsByPlayer(name).then(matches => {
        res.status(200).json({data: matches});
    });

});

//get all rounds for a player at a specific course
apiRouter.get('/api/v1/rounds/:username/:courseName', (req, res) => {
    let username = req.params.username;
    let courseName = req.params.courseName;

    db.findUserByUsername(username).then(matches => {
        if (matches.length == 0) {
            res.status(400).json({err: "Unable to find player with given name"})
        }
    });

    db.getCourseByName(courseName).then(matches => {
        if (matches.length == 0) {
            res.status(400).json({err: "Unable to find course with given name"})
        }
    });

    db.getRoundsAtCourseByPlayer.then(matches => {
        res.status(200).json({data: matches});
    })

})

//add a round 
apiRouter.post('/api/v1/rounds', (req, res) => {
    let data = req.body;
    let round;
    try {
        round = new Round(data);
    } catch (err) {
        res.status(400).json({err: err});
    }

    let player = round.player;
    let course = round.course;

    db.findUserByUsername(player).then(matches => {
        if (matches.length == 0) {
                res.status(400).json({err: "The player of the round does not exist"});
            }
    });

    db.getCourseByName(course).then(matches => {
        if (matches.length == 0) {
            res.status(400).json({err: "The course for the round does not exist"});
        }
    });

    if (db.addRound(data)) {
        res.status(200).json({msg: "Successfully added round"});
    }
    else {
        res.status(400).json({err: "Unable to add round"});
    }
})

//edit a round
apiRouter.put('/api/v1/rounds/:roundId', (req, res) => {
    let roundId = req.params.roundId;
    let data = req.body;
    let round;
    try {
        round = new Round(data);
    }
    catch (err) {
        res.status(400).json({err: "Invalid request data"});
    }

    db.getRoundById(roundId).then(round => {
        if (round == null) {
            res.status(400).json({err: "Unable to find round with the given id"});
        }

        let player = round.player;
        let course = round.course;
        db.findUserByUsername(player).then(matches => {
            if (matches.length == 0) {
                    res.status(400).json({err: "The player of the round does not exist"});
                }
        });
    
        db.getCourseByName(course).then(matches => {
            if (matches.length == 0) {
                res.status(400).json({err: "The course for the round does not exist"});
            }
        });

        if (db.addRound(data)) {
            res.status(200).json({msg: "Successfully edited round"});
        }
        else {
            res.status(400).json({err: "Unable to edit round"});
        }
        
    })

});

//delete a round
apiRouter.delete('/api/v1/rounds/:roundId', (req, res) => {
    const roundId = req.params.roundId;
    db.getRoundById(roundId).then(round => {
        if (!round) {
            res.status(400).json({err: "The round with the given id doesn't exist"});
        }
    });

    db.deleteRound(roundId).then(() => {
        res.status(200).json({msg: "Successfully removed round"});
    })
});

module.exports = apiRouter;





