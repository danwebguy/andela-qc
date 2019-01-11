import express from 'express';

import questionController from '../controllers/questions';

const router = express.Router();

router.post('/', questionController.getQuestions);

router.post('/', questionController.createQuestion);

router.patch('/:question_id/upvote', questionController.upvote);

router.patch('/:question_id/downvote', questionController.downvote);

export default router;
