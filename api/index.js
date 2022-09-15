require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port || 8080

// TODO: check how to not cache index.html
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