'use strict';

import { mongoose } from 'modern-mean-core-material/dist/server/app/mongoose';
import { Grid } from 'gridfs-stream';

Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

let controller = {create: create, read: read};

export default controller;

function create (req, res) {
    // assumes multer middleware is used:
    // app.use(multer({inMemory: true}).single('file'));

    let part = req.file;
    let writeStream = gfs.createWriteStream({
        filename: part.originalname,
        mode: 'w',
        content_type: part.mimetype
    });

    writeStream.on('close', function (thing) {
        return res.status(200).send({
            id: thing._id
        });
    });
    writeStream.write(part.buffer);
    writeStream.end();

}

 function read(req, res) {
    gfs.findOne({_id: req.params.id}, function (err, file) {
        if (err || !file) {
            return res.status(400).send({
                message: 'File not found'
            });
        }
        res.writeHead(200, {'Content-Type': file.contentType});
        gfs.createReadStream({ _id: file._id }).pipe(res);

    });

}