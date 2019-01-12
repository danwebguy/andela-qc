import express from 'express';

import questionsController from '../controllers/questions';

const router = express.Router();

router.get('/', questionsController.getQuestions);

router.post('/', questionsController.createQuestion);

router.patch('/:question_id/upvote', questionsController.upvote);

router.patch('/:question_id/downvote', questionsController.downvote);

export default router;
