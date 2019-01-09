'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _meetups = require('../controllers/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// @route Get api/v1/meetups/test
// @desc Test post route
// @access Public
router.get('/', _meetups2.default.getMeetups);

router.get('/upcoming', _meetups2.default.upcomingMeetups);

router.get('/:id', _meetups2.default.getMeetupsById);

router.post('/', _meetups2.default.createMeetup);

exports.default = router;