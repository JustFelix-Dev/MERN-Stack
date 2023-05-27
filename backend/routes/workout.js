const express = require('express');
const workoutController = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require Auth for workout routes
router.use(requireAuth)
// get all workout
router.get('/', workoutController.workout);
// get single workout
router.get('/:id', workoutController.workout_single);
// post a workout
router.post('/',workoutController.workout_post);
// delete a workout
router.delete('/:id',workoutController.workout_delete);
// update a workout 
router.patch('/:id', workoutController.workout_update);


module.exports = router ;