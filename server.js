require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const PORT = process.env.PORT || 3000

app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use('/image', require('./routes/image'))
app.use('/album', require('./routes/album'))
app.use('/gallery', require('./routes/gallery'))
app.get('/healthz', require('./routes/healthz'))
app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ "error": "404 Not Found" });
  } else {
    res.type('txt').send("404 Not Found");
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));