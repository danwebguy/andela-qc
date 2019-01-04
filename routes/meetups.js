const express = require('express');

const meetupController = require('../controllers/meetups');

const router = express.Router();

// @route Get api/v1/meetups/test
// @desc Test post route
// @access Public
router.get('/', meetupController.getMeetups);

router.get('/upcoming', meetupController.upcomingMeetups);

router.get('/:id', meetupController.getMeetupsById);

router.post('/', meetupController.createMeetup);

module.exports = router;
