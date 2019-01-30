import express from 'express';

import commentsController from '../controllers/comments';
import auth from '../helpers/auth';

const router = express.Router();

router.post('/:id', auth.verifyToken, commentsController.createComments);

export default router;
