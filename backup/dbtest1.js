import pool from './db';

pool.on('connect', () => {
console.log ('connected');
});

const dbSchema = [`
DROP TABLE IF EXISTS meetups CASCADE;
  CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(255) NOT NULL,
    topic VARCHAR(255) UNIQUE NOT NULL,
    happeningOn TIMESTAMP NOT NULL,
    Tags TEXT []
  )',
  'DROP TABLE IF EXISTS questions CASCADE;
  CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdBy INTEGER,
    meetup_id INTEGER NOT NULL, 
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    votes INTEGER,
    FOREIGN KEY (createdBy) REFERENCES users (id),
    FOREIGN KEY (meetup_id) REFERENCES meetups (id)
  )',
  'DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    othername VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phoneNumber BIGINT NOT NULL,
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isAdmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL
  )',
  'DROP TABLE IF EXISTS comments CASCADE;
  CREATE TABLE comments (
    question_id INTEGER PRIMARY KEY NOT NULL,
    title VARCHAR(255),
    body VARCHAR(255),
    comment VARCHAR(255) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE RESTRICT
  )`,
];
