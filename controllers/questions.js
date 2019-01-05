const questions = require('../models/question');

exports.createQuestion = (req, res) => {
  if (!req.body.title) {
    res.status(400).send('title is Required');
    return;
  }
  if (!req.body.body) {
    res.status(400).send('body is Required');
    return;
  }

  const question = {
    id: questions.length + 1,
    createdOn: new Date().toISOString().slice(0, 10),
    createdBy: 1,
    meetup: 1,
    title: req.body.title,
    body: req.body.body,
    votes: 0,
  };
  questions.push(question);
  res.status(201).send({
    status: 201,
    data: [question],
  });
};

exports.upvote = (req, res) => {
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
};

exports.downvote = (req, res) => {
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
};
