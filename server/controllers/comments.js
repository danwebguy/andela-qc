import db from '../models/db';
import validateCommentsInput from '../helpers/comments';

class commentsController {
  static async createComments(req, res) {
    const { errors, isValid } = validateCommentsInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const findQuestionsid = 'SELECT * FROM questions WHERE id = $1';
    const question = req.params.id;
    const { comment } = req.body;
    try {
      const { rows } = await db.query(findQuestionsid, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'Question not found' });
      }
      const addComment = `INSERT INTO comments (question, title, body, comment) VALUES ('${question}','${rows[0].title}', '${rows[0].body}', '${comment}') returning *`;
      const results = await db.query(addComment);
      return res.status(200).json({
        status: 200,
        data: [
          results.rows,
        ],
      });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  }
}
export default commentsController;
