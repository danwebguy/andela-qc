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

  static async createQuestion(req, res) {
    const findAllQuestions = 'SELECT * FROM questions ORDER by id ASC';
    try {
      const { rows, rowCount } = await db.query(findAllQuestions);
      return res.status(200).send({ rows, rowCount });
    } catch (error) {
      return res.status(400).send({ message: 'No Questions found' });
    }
  }
}
export default questionsController;
