'use strict';
import imageUpload from '../controllers/image.server.controller.js';
import { express } from 'modern-mean-core-material/dist/server/app/express';
import logger from '../config/logger';
import profileUpload from '../config/profileUpload';
import multer from 'multer';

function init(app) {
    return new Promise((resolve, reject) => {
        logger.debug('Image::Routes::Start');
        let router = express.Router();

        let upload = multer({
            storage: multer.memoryStorage(),
            fileFilter: profileUpload.filter
        });

        router.route('/:imageId').get(imageUpload.read);
        router.route('/').post(upload.single('file'), imageUpload.create);

        app.use('/api/image', router);
        logger.verbose('Image::Routes::Success');
        return resolve(app);
    });
}

let route = {init: init};

export default route;
export {init};
