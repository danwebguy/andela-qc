const meetups = require('../models/meetup');

exports.getMeetups = (req, res) => {
  res.send(meetups);
};

exports.upcomingMeetups = (req, res) => {
  const upcoming = meetups.filter(
    result => result.happeningOn > new Date().toISOString().slice(0, 10),
  );
  if (upcoming === undefined || upcoming.length === 0) {
    res.status(400).send({ message: 'No upcoming meetups' });
  } else {
    res.status(200).send({
      status: 200,
      data: upcoming,
    });
  }
};

exports.getMeetupsById = (req, res) => {
  const meetup = meetups.find(m => m.id === Number(req.params.id));
  if (!meetup) res.status(404).send({ message: 'The Meetup with the given ID was not found' });
  else {
    res.status(200).send({
      status: 200,
      data: meetup,
    });
  }
};

exports.createMeetup = (req, res) => {
  if (!req.body.location) {
    res.status(400).send('Location is Required');
    return;
  }
  if (!req.body.topic) {
    res.status(400).send('Topic is Required');
    return;
  }
  if (!req.body.happeningOn) {
    res.status(400).send('What Date will the Event Take Place');
    return;
  }

  const meetup = {
    id: meetups.length + 1,
    createdOn: new Date().toISOString().slice(0, 10),
    location: req.body.location,
    images: req.body.images,
    topic: req.body.topic,
    happeningOn: req.body.happeningOn,
    tags: req.body.tags,
  };
  meetups.push(meetup);
  res.status(201).send({
    status: 201,
    data: [meetup],
  });
};
