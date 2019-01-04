const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const users = require('./routes/users');
const questions = require('./routes/questions');
const rsvp = require('./routes/rsvp');
const meetups = require('./routes/meetups');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

// Use Routes
app.use('/api/v1/users', users);
app.use('/api/v1/meetups', meetups);
app.use('/api/v1/questions', questions);
app.use('/api/v1/meetups', rsvp);

const port = process.env.PORT || 3000;
const server = app.listen(port);
module.exports = server;
