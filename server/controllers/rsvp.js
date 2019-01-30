import db from '../models/db';
import validateRsvpInput from '../helpers/rsvp';

class rsvpController {
  static async createRsvp(req, res) {
    const { errors, isValid } = validateRsvpInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const findMeetupById = 'SELECT * FROM meetup WHERE id = $1';
    const meetup = req.params.id;
    const userId = req.user.id;
    const { response } = req.body;
    try {
      const { rows } = await db.query(findMeetupById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Meetup not found' });
      }
      const findAllRsvp = `INSERT INTO rsvp (meetup, userId, response, topic) VALUES ('${meetup}','${userId}', '${response}', '${rows[0].topic}') returning *`;
      const results = await db.query(findAllRsvp);
      return res.status(200).json({
        status: 200,
        data: [
          results.rows,
        ],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({ message: 'You have already made an RSVP' });
      }
      return res.status(400).send({ message: error.message });
    }
  }
}
export default rsvpController;
