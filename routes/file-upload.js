const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bytea = require('postgres-bytea');

function addFile(binaryFile) {
    // inserting data into column 'img' of type 'bytea':
    db.none('INSERT INTO images(image) VALUES($1)', [binaryFile])
        .then(() => {
            // success;
            console.log('insert success');
        })
        .catch(error => {
            // error;
            console.log('insert failed');
        });
}

router.post('/', function (req, res, next) {
    console.log('req.body', req.body);
    console.log('req.get(\'Content-Type\')',req.get('Content-Type'));

    var busboy = req.busboy;
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        let buffer = [];
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
            console.log('File [' + filename + '] got ' + data.length + ' bytes ' + data[1]);
            buffer = [...buffer, ...data];
        }).on('end', () => {
            console.log('End. Buffer size', buffer.length);
            const hex = buf2hex(new Uint8Array(buffer));
            console.log(hex);
            const byte = new bytea('\\x'  + hex);
            addFile(byte);
        })
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        res.send("Done")
    });
});

router.post('/v2', function (req, res, next) {
    console.log('req.body', req.body);
    console.log('req.get(\'Content-Type\')',req.get('Content-Type'));

    if (req.get('Content-Type')?.toLowerCase() !== 'application/octet-stream') {
        throw new Error('Expected application/octet-stream content type');
    }
    addFile(req.body);
});

function buf2hex(buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}

module.exports = router;
