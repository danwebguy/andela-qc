const express = require('express');

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public
router.get('/test', (req, res) => res.json({ msq: 'Users Works' }));

module.exports = router;
