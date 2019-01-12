import express from 'express';

import {
  getQuestions, createQuestion, upvote, downvote,
} from '../controllers/questions';

const router = express.Router();

router.get('/', getQuestions);

router.post('/', createQuestion);

router.patch('/:question_id/upvote', upvote);

router.patch('/:question_id/downvote', downvote);

export default router;
