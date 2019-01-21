import db from '../models/db';
import validateQuestionInput from '../helpers/question';

class questionsController {
  static async getQuestions(req, res) {
    const results = await db.query('SELECT * FROM questions ORDER BY id ASC');
    try {
      return res.status(200).json({
        status: 200,
        data: [
          results.rows,
        ],
      });
    } catch (error) {
      return res.status(400, 404).json({ message: 'No Questions found' });
    }
  }

  static async createQuestion(req, res) {
    const { errors, isValid } = validateQuestionInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const findMeetupById = 'SELECT * FROM meetup WHERE id = $1';
    const meetup = req.params.id;
    const createdBy = req.user.id;
    const { body, title } = req.body;
    const findAllQuestions = `INSERT INTO questions (body, title, meetup, createdBy) VALUES ('${body}','${title}', '${meetup}', '${createdBy}') returning *`;
    try {
      const { rows } = await db.query(findMeetupById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Meetup not found' });
      }
      await db.query(findAllQuestions);
      return res.status(200).json({
        status: 200,
        data: [
          createdBy,
          meetup,
          title,
          body,
        ],
      });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }

  static async upvoteQuestion(req, res) {
    const findQuestionById = 'SELECT * FROM questions WHERE id = $1';
    try {
      const { rows } = await db.query(findQuestionById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Question not found' });
      }
      const upvoters = rows[0].users;
      if (upvoters === 0 || upvoters.map(upvote => upvote.user === req.user.id).lenght > 0) {
        return res.status(400).json({ alreadyupvoted: 'User already upvoted this question' });
      }
      const updateAQuestion = `INSERT INTO
      questions(users, votes)
      VALUES(array[ $1 ], $2)
      returning *`;
      const values = [
        upvoters,
        rows[0].votes += 1,
      ];
      const response = await db.query(updateAQuestion, values);
      return res.status(200).json({
        status: 200,
        data: [
          response.rows[0],
        ],
      });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
export default questionsController;
