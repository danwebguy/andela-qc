import express from 'express';
import auth from '../helpers/auth';

import questionsController from '../controllers/questions';

const router = express.Router();

router.get('/', questionsController.getQuestions);

router.post('/', auth.verifyToken, questionsController.createQuestion);

export default router;
