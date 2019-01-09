'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public
router.get('/test', function (req, res) {
  return res.json({ msq: 'Users Works' });
});

exports.default = router;