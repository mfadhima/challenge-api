let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let multer = require('multer')

const db = require('./database/index')
const port = 9999

app.use(bodyParser.json())
app.use(cors())

let multerStorageConfig = multer.diskStorage(
    {
        destination : (req, file, cb) => {
            cb(null, './uploads')
        },
    
        filename : (req, file, cb) => {
            cb(null, `PRD-${Date.now()}.${file.mimetype.split('/')[1]}`)
        }
    }
)

let filterConfig = (req, file, cb) => {
    if(file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'jpeg') {
        cb(null, true)
    } else {
        req.validation = {
            error : true,
            msg : 'File must be an image'
        }
        cb(null, false)
    }
}

let upload = multer(
    {
        storage : multerStorageConfig,
        fileFilter : filterConfig
    }
)

app.post(
    '/postitem', (req, res) => {
        db.query(`insert into images (id, imagesName, imagesPath) values (0, '${req.body.imagesName}', 0)`), (err, result) => {
            if(err) throw err
            res.send(result)
        }
    }
)

app.listen(port, console.log('Listening in port ' + port))