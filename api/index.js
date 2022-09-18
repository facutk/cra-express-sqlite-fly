require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const nodemailer = require('nodemailer');
// const MagicLoginStrategy = require('passport-magic-login');

let db;
(async () => {
  db = await open({
    filename: process.env.DATABASE_PATH,
    driver: sqlite3.Database,
  });

  await db.migrate();
})();

// const token = process.env.TOKEN || 'blabla';

const app = express();
const port = process.env.port || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.header(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate'
  );
  response.header('Expires', '-1');
  response.header('Pragma', 'no-cache');
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/foo', (req, res) => {
  res.json({ foo: 'bar' });
});

app.get('/hits', async (req, res) => {
  await db.run('INSERT INTO hits(id) VALUES(null)');

  const { count } = await db.get('SELECT COUNT(*) AS count FROM hits');
  console.log(count);

  res.json({ hits: count });
});

app.post('/create-user', async (req, res) => {
  const user = { user: res.body };
  console.log(user);
  res.json(user);
  // await db.run('INSERT INTO users(id) VALUES()');
});

app.post('/create-job', async (req, res) => {
  const job = { job: res.body };
  console.log(job);
  res.json(job);
  // await db.run('INSERT INTO job(id) VALUES()');
});

const sendEmail = ({ to = 'example@email.com' }) => {
  const transport = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDINBLUE_USERNAME,
      pass: process.env.SENDINBLUE_PASSWORD,
    },
  });

  const url = 'https://google.com.ar/';

  const mailOptions = {
    from: '"Example Team" <from@example.com>',
    to,
    subject: 'Nice Nodemailer test',
    text: `Hey there, it’s our first message sent with Nodemailer. ${url} ;)`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`/mail - [error]: ${error}`);
    } else {
      console.log(`/mail - [sucess]: ${info.response}`);
    }
  });
};

app.post('/mail', (req, res) => {
  if (
    process.env.ADMIN_ACCOUNT.trim().toLowerCase()
    === req.body.email.trim().toLowerCase()
  ) {
    sendEmail({ to: req.body.email });
  }
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
