const express = require('express')
const cors = require('cors')
const passport = require('passport')
const routerApi = require('./routes')

const app = express()
const port = process.env.PORT

app.use(express.json())

const whiteList = ['http://localhost:3000', 'http://localhost:3005']

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not estas autorizado'))
    }
  }
}

app.use(cors(corsOptions))

// require('./utils/auth')
// app.use(passport.initialize())

routerApi(app)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
