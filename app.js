const express = require('express');
const multer  = require('multer');
const fs  = require('fs');
const image = require('./render.js');
const path = require('path');
const app = express();
// const { render } = requploaduire('ejs');
const { constants } = require('buffer');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const location = __dirname+"/uploads/";

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = __dirname+"/uploads/";
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).array('files', 12);


app.get('/', (req, res) => {
    if (req.method == "GET"){
        res.render('index');
    }
});



app.post('/parsed_content', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Oops!! Something went wrong :(");
        }
        else {
            image.file_finder(location);
            setTimeout(function() {
                res.end(image.data.content);
              }, 10000);
        }   
    });

    
})

app.listen(3000);
console.log("your app is running on port 3000");