import db from '../models/db';
import validateQuestionInput from '../helpers/question';

class questionsController {
  static async getQuestions(req, res) {
    const findAllQuestions = 'SELECT * FROM questions ORDER by id ASC';
    try {
      const { rows, rowCount } = await db.query(findAllQuestions);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send({ message: 'No Questions found' });
    }
  }

      return res.status(400).json(errors);
    }
    const meetupId = 'SELECT * FROM meetup WHERE id = $1';
    const questions = `INSERT INTO
      questions(createdby, meetup, title, body)
      VALUES($1, $2, $3, $4)
      returning *`;
    try {
      const { rows } = await db.query(meetupId, [req.params.meetupid]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Meetup not found' });
      }
      const values = [
        req.user.userid,
        req.params.meetupid,
        req.body.title,
        req.body.body,
      ];
      const response = await db.query(questions, values);
      return res.status(200).json({
        status: 200,
        data: [
          response.rows[0],
        ],
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}
export default questionsController;
