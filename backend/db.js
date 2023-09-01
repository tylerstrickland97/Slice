const firebase = require('./firebase.js');

const userRef = firebase.collection('users');
const courseRef = firebase.collection('courses');
const roundRef = firebase.collection('rounds');

module.exports = {
    findUserByUsername: async (username) => {
        const snapshot = await userRef.where('username', '==', username).get();
        if (snapshot.empty) {
            return [];
        }
        else {
            let matches = [];
            snapshot.docs.forEach(doc => {
                let user = {
                    id: doc.id,
                    data: doc.data()
                };
                matches.push(user);
            });

            return matches;
        }
    },

    addNewUser: async (user) => {
        const userId = user.id;
        await userRef.doc(userId).set({
            username: user.username,
            salt: user.salt,
            password_hash: user.password_hash,
            handicap: user.handicap
        }).then(() => {
            return true;
        }).catch(err => {
            console.log(err);
            return false;
        });
    },

    getCourses: async () => {
       const snapshot = await courseRef.get();
       if (snapshot.empty) {
            return [];
       }
       else {
            let matches = [];
            snapshot.docs.forEach(doc => {
                matches.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            return matches;
       }
    },
    
    getCourseByName: async (name) => {
        const snapshot = await courseRef.where('name', '==', name).get();
        if (snapshot.empty) {
            return [];
        }
        else {
            let matches = [];
            snapshot.docs.forEach(doc => {
                matches.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            return matches;
        }
    },

    addCourse: async (course) => {
        const courseId = course.id;
        await courseRef.doc(courseId).set({
            name: course.name,
            rating: course.rating,
            slope: course.slope,
            par: course.par,
            hole_handicaps: course.hole_handicaps,
            hole_pars: course.hole_pars
        }).then(() => {
            return true;
        }).catch(err => {
            return false;
        });
    },

    getRoundsByPlayer: async (player) => {
        const snapshot = await roundRef.where('player', '==', player).get();
        if (snapshot.empty) {
            return [];
        }
        else {
            let matches = [];
            snapshot.docs.forEach(doc => {
                matches.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            return matches;
        }
    },

    getRoundsAtCourseByPlayer: async (player, course) => {
        const snapshot = await roundRef.where('player', '==', player).where('course', '==', 'course').get();
        if (snapshot.empty) {
            return [];
        }
        else {
            let matches = [];
            snapshot.docs.forEach(doc => {
                matches.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            return matches;
        }
    },

    addRound: async (round) => {
        const roundId = round.id;
        await roundRef.doc(roundId).set({
            course: round.course,
            date: round.date,
            player: round.player,
            total_score: data.total_score,
            per_hole_score: data.per_hole_score 
        }).then(() => {
            return true;
        }).catch(err => {
            return false;
        });
    },

    getRoundById: async (id) => {
        const roundDoc = await roundRef.doc(id).get();
        if (roundDoc.exists) {
            return {
                id: id,
                data: roundDoc.data()
            }
        }
        else {
            return null;
        }
    },

    deleteRound: async (id) => {
        const res = await roundRef.doc(id).delete();
    }
}