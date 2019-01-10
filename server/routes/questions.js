import express from 'express';

import questionController from '../controllers/questions';

const router = express.Router();

// @route Get api/v1/meetups/test
// @desc Test post route
// @access Public

router.post('/', questionController.createQuestion);

router.patch('/:question_id/upvote', questionController.upvote);

router.patch('/:question_id/downvote', questionController.downvote);

export default router;
