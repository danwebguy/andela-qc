'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

require('airbnb-browser-shims');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _users = require('./server/routes/users');

var _users2 = _interopRequireDefault(_users);

var _questions = require('./server/routes/questions');

var _questions2 = _interopRequireDefault(_questions);

var _rsvp = require('./server/routes/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _meetups = require('./server/routes/meetups');

var _meetups2 = _interopRequireDefault(_meetups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use((0, _helmet2.default)());
app.use((0, _compression2.default)());
app.use('/api/v1/users', _users2.default);
app.use('/api/v1/meetups', _meetups2.default);
app.use('/api/v1/questions', _questions2.default);
app.use('/api/v1/meetups', _rsvp2.default);

var port = process.env.PORT || 3000;
var server = app.listen(port);
exports.default = server;