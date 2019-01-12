import rsvps from '../models/rsvp';
import meetups from '../models/meetup';
import validateRsvpInput from '../helpers/rsvp';

class rsvpController {
  static getRsvp(req, res) {
    res.status(200).send({
      status: 200,
      data: [rsvps],
    });
  }

  static createRsvp(req, res) {
    const { errors, isValid } = validateRsvpInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const meetup = meetups.find(meetupid => meetupid.id === Number(req.params.meetup_id));
    const rsvp = {
      meetup: meetup.id,
      topic: meetup.topic,
      user: 1,
      status: req.body.status,
    };
    rsvps.push(rsvp);
    return res.status(201).send({
      status: 201,
      data: [rsvp],
    });
  }
}
export default rsvpController;
