import rsvps from '../models/rsvp';
import meetups from '../models/meetup';

exports.createRsvp = (req, res) => {
  const meetup = meetups.find(m => m.id === Number(req.params.meetup_id));

  if (!meetup) res.status(404).send('No Meetup was not found');
  else {
    if (!req.body.status) {
      res.status(400).send('Will you attend the meetup');
      return;
    }

    const rsvp = {
      meetup_id: meetup.id,
      topic: meetup.topic,
      user: 1,
      status: req.body.status,
    };
    rsvps.push(rsvp);
    res.status(201).send({
      status: 201,
      data: [rsvp],
    });
  }
};
