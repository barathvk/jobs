require('./lib/globals')
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const parser = require('body-parser')
const fallback = require('express-history-api-fallback')
const api = require('./server')
const app = express()
const root = __dirname + '/ui/build'
app.use(cors())
app.use(compression())
app.use(parser.json())
app.use('/api', api)
if (process.env.NODE_ENV != 'development') {
  app.use(express.static(root))
  app.use(fallback('index.html', { root: root }))
}
app.listen(config.port, () => {
  console.log(`Started Jobs Server on port ${config.port}`)
})