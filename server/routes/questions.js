import express from 'express';
import auth from '../helpers/auth';

import questionsController from '../controllers/questions';

const router = express.Router();

router.get('/', questionsController.getQuestions);

router.post('/:id', auth.verifyToken, questionsController.createQuestion);

router.patch('/:id/upvote', auth.verifyToken, questionsController.upvoteQuestion);

export default router;
