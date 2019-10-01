let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let multer = require('multer')

const port = 9999

app.use(bodyParser.json())
app.use(cors())

app.listen(port, console.log('Listening in port ' + port))