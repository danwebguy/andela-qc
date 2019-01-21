import db from '../models/db';

import validateMeetupInput from '../helpers/meetup';

class meetupController {
  static async getMeetups(req, res) {
    const findAllMeetups = 'SELECT * FROM meetup ORDER BY happeningOn ASC';
    try {
      const { rows, rowCount } = await db.query(findAllMeetups);
      return res.status(200).json({
        status: 200,
        data: [
          { rows, rowCount },
        ],
      });
    } catch (error) {
      return res.status(400).json({ message: 'No meetup found' });
    }
  }

  static async upcomingMeetups(req, res) {
    const upcoming = 'SELECT * FROM meetup WHERE happeningOn > CURRENT_DATE ORDER BY happeningOn ASC';
    try {
      const { rows, rowCount } = await db.query(upcoming);
      return res.status(200).json({
        status: 200,
        data: [
          { rows, rowCount },
        ],
      });
    } catch (error) {
      return res.status(400).json({ message: 'No upcoming meetup found' });
    }
  }

  static async getMeetupsById(req, res) {
    const meetup = 'SELECT * FROM meetup WHERE id = $1';
    try {
      const { rows } = await db.query(meetup, [req.params.id]);
      if (!rows[0]) {
        return res.status(400).json({ message: 'The Meetup with the given ID was not found' });
      }
      return res.status(200).json({
        status: 200,
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.status(400).json({ message: 'The Meetup with the given ID was not found' });
    }
  }

  static async createMeetup(req, res) {
    const { errors, isValid } = validateMeetupInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const meetups = `INSERT INTO
      meetup(location, images, topic, happeningon)
      VALUES($1, array[ $2 ], $3, $4)
      returning *`;
    const values = [
      req.body.location,
      req.body.images,
      req.body.topic,
      req.body.happeningOn,
    ];
    try {
      const { rows } = await db.query(meetups, values);
      return res.status(201).json({
        status: 200,
        data: [
          rows[0],
        ],
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async deleteMeetup(req, res) {
    const deleteQuery = 'DELETE FROM meetup WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'meetup not found' });
      }
      return res.status(201).json({
        status: 201,
        data: [
          { message: 'Meetup successfully deleted' },
        ],
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async updateMeetup(req, res) {
    const findMeetupById = 'SELECT * FROM meetup WHERE id=$1';
    const updateAmeetup = `UPDATE meetup
      SET location=$1,images=array[ $2 ],happeningOn=$3,topic=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findMeetupById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Meetup not found' });
      }
      const values = [
        req.body.location || rows[0].location,
        req.body.images || rows[0].images,
        req.body.happeningOn || rows[0].happeningOn,
        req.body.topic || rows[0].topic,
        req.params.id,
      ];
      const response = await db.query(updateAmeetup, values);
      return res.status(200).json(response.rows[0]);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
export default meetupController;
