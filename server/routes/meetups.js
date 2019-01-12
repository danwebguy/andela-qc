import express from 'express';

import meetupController from '../controllers/meetups';

const router = express.Router();

router.get('/', meetupController.getMeetups);

router.get('/upcoming', meetupController.upcomingMeetups);

router.get('/:id', meetupController.getMeetupsById);

router.post('/', meetupController.createMeetup);

export default router;
