import _ from 'lodash';
import meetups from '../models/meetup';
import validateMeetupInput from '../helpers/meetup';

export const getMeetups = (req, res) => {
  res.status(200).send({
    status: 200,
    data: [meetups],
  });
};

export const upcomingMeetups = (req, res) => {
  const upcoming = meetups.filter(
    result => result.happeningOn > new Date().toISOString().slice(0, 10),
  );

  if (upcoming.length === 0) {
    res.status(400).send({ message: 'No upcoming meetups' });
  } else {
    res.status(200).send({
      status: 200,
      data: [_.sortBy(upcoming, 'happeningOn')],
    });
  }
};

export const getMeetupsById = (req, res) => {
  const meetup = meetups.find(meetupid => meetupid.id === Number(req.params.id));
  if (!meetup) res.status(404).send({ message: 'The Meetup with the given ID was not found' });
  else {
    res.status(200).send({
      status: 200,
      data: [meetup],
    });
  }
};

export const createMeetup = (req, res) => {
  const { errors, isValid } = validateMeetupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const {
    id,
    location,
    images,
    topic,
    happeningOn,
    tags,
  } = req.body;
  const meetup = {
    id,
    createdOn: new Date().toISOString().slice(0, 10),
    location,
    images,
    topic,
    happeningOn,
    tags,
  };

  meetups.push(meetup);
  return res.status(201).send({
    status: 201,
    data: [meetup],
  });
};
