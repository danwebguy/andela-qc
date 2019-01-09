'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _rsvp = require('../controllers/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// @route Get api/v1/rsvp/test
// @desc Test post route
// @access Public
router.post('/:meetup_id/rsvps', _rsvp2.default.createRsvp);

exports.default = router;