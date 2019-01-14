import questions from '../models/question';
import validateQuestionInput from '../helpers/question';

class questionsController {
  static getQuestions(req, res) {
    res.status(200).send({
      status: 200,
      data: [questions],
    });
  }

  static createQuestion(req, res) {
    const { errors, isValid } = validateQuestionInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { title, body } = req.body;
    const question = {
      id: questions.length + 1,
      createdOn: new Date().toISOString().slice(0, 10),
      createdBy: 1,
      meetup: 1,
      title,
      body,
      votes: 0,
    };
    questions.push(question);
    return res.status(201).send({
      status: 201,
      data: [question],
    });
  }

  static upvote(req, res) {
    const Question = questions.find(q => q.id === Number(req.params.question_id));
    if (!Question) res.status(404).send('No Question was not found');
    const question = {
      meetup: 1,
      title: Question.title,
      body: Question.body,
      votes: Question.votes += 1,
    };
    questions.push(question);
    res.status(200).send({
      status: 200,
      data: [question],
    });
  }

  static downvote(req, res) {
    const Question = questions.find(q => q.id === Number(req.params.question_id));
    if (!Question) res.status(404).send('No Question found');
    const question = {
      meetup: 1,
      title: Question.title,
      body: Question.body,
      votes: Question.votes -= 1,
    };
    questions.push(question);
    res.status(200).send({
      status: 200,
      data: [question],
    });
  }
}
export default questionsController;
