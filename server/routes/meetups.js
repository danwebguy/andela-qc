import express from 'express';

import meetupController from '../controllers/meetups';
import auth from '../helpers/auth';
import isadmin from '../helpers/isadmin';

const router = express.Router();

router.get('/', auth.verifyToken, meetupController.getMeetups);

router.get('/upcoming', auth.verifyToken, meetupController.upcomingMeetups);

router.get('/:id', auth.verifyToken, meetupController.getMeetupsById);

router.put('/:id', auth.verifyToken, isadmin, meetupController.updateMeetup);

router.delete('/:id', auth.verifyToken, isadmin, meetupController.deleteMeetup);

router.post('/', auth.verifyToken, isadmin, meetupController.createMeetup);

router.post('/:id/tags', auth.verifyToken, isadmin, meetupController.addTagsMeetup);

export default router;
