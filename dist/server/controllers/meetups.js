'use strict';

var _meetup = require('../models/meetup');

var _meetup2 = _interopRequireDefault(_meetup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.getMeetups = function (req, res) {
  res.send(_meetup2.default);
};

exports.upcomingMeetups = function (req, res) {
  var upcoming = _meetup2.default.filter(function (result) {
    return result.happeningOn > new Date().toISOString().slice(0, 10);
  });
  if (upcoming.length === 0) {
    res.status(400).send({ message: 'No upcoming meetups' });
  } else {
    res.status(200).send({
      status: 200,
      data: upcoming
    });
  }
};

exports.getMeetupsById = function (req, res) {
  var meetup = _meetup2.default.find(function (m) {
    return m.id === Number(req.params.id);
  });
  if (!meetup) res.status(404).send({ message: 'The Meetup with the given ID was not found' });else {
    res.status(200).send({
      status: 200,
      data: meetup
    });
  }
};

exports.createMeetup = function (req, res) {
  if (!req.body.location) {
    res.status(400).send('Location is Required');return;
  }
  if (!req.body.topic) {
    res.status(400).send('Topic is Required');return;
  }
  if (!req.body.happeningOn) {
    res.status(400).send('What Date will the Event Take Place');return;
  }
  if (!req.body.tags) {
    res.status(400).send('Tags is Required');return;
  }

  var meetup = {
    id: _meetup2.default.length + 1,
    createdOn: new Date().toISOString().slice(0, 10),
    location: req.body.location,
    images: req.body.images,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags
  };
  _meetup2.default.push(meetup);
  res.status(201).send({
    status: 201,
    data: [meetup]
  });
};