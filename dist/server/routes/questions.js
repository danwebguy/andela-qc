'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _questions = require('../controllers/questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// @route Get api/v1/meetups/test
// @desc Test post route
// @access Public

router.post('/', _questions2.default.createQuestion);

router.patch('/:question_id/upvote', _questions2.default.upvote);

router.patch('/:question_id/downvote', _questions2.default.downvote);

exports.default = router;