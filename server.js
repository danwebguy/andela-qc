import express from 'express';
import 'airbnb-browser-shims';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';

import users from './server/routes/users';
import questions from './server/routes/questions';
import rsvp from './server/routes/rsvp';
import meetups from './server/routes/meetups';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());
app.use('/api/v1/users', users);
app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);
app.use('/api/v1/meetups', rsvp);

const port = process.env.PORT || 3000;
const server = app.listen(port);
export default server;
