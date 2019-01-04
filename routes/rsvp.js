const express = require('express');

const rsvpController = require('../controllers/rsvp');

const router = express.Router();

// @route Get api/v1/rsvp/test
// @desc Test post route
// @access Public
router.post('/:meetup_id/rsvps', rsvpController.createRsvp);

module.exports = router;
