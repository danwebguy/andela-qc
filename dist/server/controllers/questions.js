'use strict';

var _question = require('../models/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createQuestion = function (req, res) {
  if (!req.body.title) {
    res.status(400).send('title is Required');
    return;
  }
  if (!req.body.body) {
    res.status(400).send('body is Required');
    return;
  }

  var question = {
    id: _question2.default.length + 1,
    createdOn: new Date().toISOString().slice(0, 10),
    createdBy: 1,
    meetup: 1,
    title: req.body.title,
    body: req.body.body,
    votes: 0
  };
  _question2.default.push(question);
  res.status(201).send({
    status: 201,
    data: [question]
  });
};

exports.upvote = function (req, res) {
  var Question = _question2.default.find(function (q) {
    return q.id === Number(req.params.question_id);
  });
  if (!Question) res.status(404).send('No Question was not found');

  var question = {
    meetup: 1,
    title: Question.title,
    body: Question.body,
    votes: Question.votes += 1
  };

  _question2.default.push(question);
  res.status(200).send({
    status: 200,
    data: [question]
  });
};

exports.downvote = function (req, res) {
  var Question = _question2.default.find(function (q) {
    return q.id === Number(req.params.question_id);
  });
  if (!Question) res.status(404).send('No Question found');

  var question = {
    meetup: 1,
    title: Question.title,
    body: Question.body,
    votes: Question.votes -= 1
  };

  _question2.default.push(question);
  res.status(200).send({
    status: 200,
    data: [question]
  });
};