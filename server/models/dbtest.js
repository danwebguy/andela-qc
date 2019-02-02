const dbSchema = `
  DROP TABLE IF EXISTS meetup CASCADE;
  CREATE TABLE meetup (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(255) NOT NULL,
    topic VARCHAR(255) UNIQUE NOT NULL,
    happeningOn TIMESTAMP NOT NULL,
    description TEXT NULL,
    images TEXT [],
    tags TEXT []
  );
  DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    othername VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(100),
    username VARCHAR(100),
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isAdmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL
  );
  DROP TABLE IF EXISTS questions CASCADE;
  CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdBy INTEGER,
    meetup INTEGER NOT NULL, 
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    users TEXT [] DEFAULT '{"0"}',
    votes INTEGER DEFAULT '0',
    constraint votes_nonnegative check (votes >= 0)
  );
  DROP TABLE IF EXISTS comments CASCADE;
  CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    question INTEGER NOT NULL,
    title VARCHAR(255),
    body VARCHAR(255),
    comment TEXT NOT NULL
  );
  DROP TABLE IF EXISTS rsvp CASCADE;
  CREATE TABLE rsvp (
    id SERIAL PRIMARY KEY,
    meetup INTEGER,
    topic VARCHAR(255),
    userId INTEGER,
    response VARCHAR(255) UNIQUE DEFAULT 'Yes'
  );
  INSERT INTO users(
    firstname, lastname, othername, username, email, phonenumber, password)
    VALUES ('Daniel', 'Ufeli', 'Anwana', 'danwebguy', 'danielufeli@yahoo.com', '08082205956', '$2a$10$MjDd29.fW5U2/FlO.irBN.I68xQn6YDNO2mS4X6xbqaR0AxlYkkWa');
    INSERT INTO users(
      firstname, lastname, othername, username, email, phonenumber, password, isadmin)
      VALUES ('Daniel', 'Ufeli', 'Anwana', 'danwebguy', 'james@yahoo.com', '08082205956', '$2a$10$MjDd29.fW5U2/FlO.irBN.I68xQn6YDNO2mS4X6xbqaR0AxlYkkWa', 'true');
      INSERT INTO meetup(
        location, happeningon, topic, images, description)
        VALUES ('Lagos', '2019-02-04', 'Social Media Week Lagos 2019', 
        '{"img/e1.jpg"}', 'Social Media Week Lagos heads into it 7th year after a successful 2018 edition that saw over 20,000 attendees across the week and had a online social reach of 646 million');
        INSERT INTO meetup(
          location, happeningon, topic, images, description)
          VALUES ('Lagos', '2019-12-22', 'Lagos Weight Loss and Wellness Support Group', 
          '{"img/meetup1.jpg"}', 'Finally you can find the motivation to achieve your goal weight and lose weight without feeling deprived or hungry.');
            INSERT INTO questions(
              createdby, meetup, title, body, users, votes)
              VALUES ('2', '3', 'Jesus is Lord', 'Jesus is Lord | We made it', '{"2"}', '10');
`;
export default dbSchema;
