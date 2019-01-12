import express from 'express';

import {
  getMeetups, upcomingMeetups, getMeetupsById, createMeetup,
} from '../controllers/meetups';

const router = express.Router();

router.get('/', getMeetups);

router.get('/upcoming', upcomingMeetups);

router.get('/:id', getMeetupsById);

router.post('/', createMeetup);

export default router;
