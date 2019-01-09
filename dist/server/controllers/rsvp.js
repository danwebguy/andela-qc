'use strict';

var _rsvp = require('../models/rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _meetup = require('../models/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createRsvp = function (req, res) {
  var meetup = _meetup2.default.find(function (m) {
    return m.id === Number(req.params.meetup_id);
  });

  if (!meetup) res.status(404).send('No Meetup was not found');else {
    if (!req.body.status) {
      res.status(400).send('Will you attend the meetup');
      return;
    }

    var rsvp = {
      meetup_id: meetup.id,
      topic: meetup.topic,
      user: 1,
      status: req.body.status
    };
    _rsvp2.default.push(rsvp);
    res.status(201).send({
      status: 201,
      data: [rsvp]
    });
  }
};