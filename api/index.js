require('dotenv').config()
const path = require('path');
const express = require('express')
const app = express()
const port = process.env.port || 8080

app.get('/', (request, response) => {
  response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  response.header('Expires', '-1');
  response.header('Pragma', 'no-cache');
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(express.static('public'))

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.get('/foo', (req, res) => {
  res.json({ foo: 'bar' })
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})