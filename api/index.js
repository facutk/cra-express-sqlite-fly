require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const cookieParser = require('cookie-parser');

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

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/foo', (req, res) => {
  res.json({ foo: 'bar' });
});

app.get('/api/hits', async (req, res) => {
  await db.run('INSERT INTO hits(id) VALUES(null)');

  const { count } = await db.get('SELECT COUNT(*) AS count FROM hits');
  console.log(count);

  return res.json({ hits: count });
});

app.post('/api/create-user', async (req, res) => {
  const user = { user: res.body };
  console.log(user);
  return res.json(user);
  // await db.run('INSERT INTO users(id) VALUES()');
});

app.post('/api/create-job', async (req, res) => {
  const job = { job: res.body };
  console.log(job);
  return res.json(job);
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

  const url = `${process.env.BASE_URL}/#/?token=${process.env.TOKEN}`;

  const mailOptions = {
    from: '"Example Team" <from@example.com>',
    to,
    subject: 'Nice Nodemailer test',
    text: `Hey there, it???s our first message sent with Nodemailer. ${url} ;)`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`/mail - [error]: ${error}`);
    } else {
      console.log(`/mail - [sucess]: ${info.response}`);
    }
  });
};

app.post('/api/mail', (req, res) => {
  const adminEmail = process.env.ADMIN_ACCOUNT.trim().toLowerCase();
  const reqEmail = req.body.email.trim().toLowerCase();
  if (adminEmail === reqEmail) {
    sendEmail({ to: req.body.email });
    return res.json({ status: 201 });
  }

  return res.json({ status: 401 });
});

app.get('/api/protected', (req, res) => {
  console.log('/api/protected: ', {
    reqCookie: req.cookies,
    process: process.env.TOKEN,
  });
  if (req.cookies.token === process.env.TOKEN) {
    return res.sendStatus(200);
  }
  res.sendStatus(401);
});

app.get('/api/profile', (req, res) => {
  console.log('/api/profile: ', {
    reqCookie: req.cookies,
    process: process.env.TOKEN,
  });
  if (req.cookies.token === process.env.TOKEN) {
    return res.json({ status: 201 });
  }
  res.sendStatus(401);
});

app.get('/api/auth/logout', (req, res) => {
  return res
    .cookie('token', '', { expires: new Date(0) })
    .redirect(process.env.BASE_URL);
});

app.get('/api/auth/:token', (req, res) => {
  if (req.params.token === process.env.TOKEN) {
    return res.cookie('token', req.params.token).redirect(process.env.BASE_URL);
  }

  return res.sendStatus(401);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
