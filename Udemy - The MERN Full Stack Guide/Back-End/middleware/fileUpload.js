const multer = require('multer');
const { v1: uuidv1 } = require('uuid');


//Because Multer provides mime type and we will get the extension by accessing this object
const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
}

const fileUpload = multer({
    limits:500000,
    storage:multer.diskStorage({
        destination:(req, fileExtracted, callBack)=>{
            callBack(null, 'uploads/images');
        },
        filename:(req, fileExtracted, callBack)=>{
            const extensionOfFile = MIME_TYPE_MAP[fileExtracted.mimetype];
            callBack(null, `${uuidv1()}.${extensionOfFile}`);
        }
    }),
    //Because we can't trust on Frontend validation, it's client side and anything can happen here.
    fileFilter:(req, fileExtracted, callBack)=>{
        const isValid = !!MIME_TYPE_MAP[fileExtracted.mimetype];
        const error = isValid ? null : new Error('Invalid MIME Type!');
        callBack(error, isValid)
    }    
});

module.exports = fileUpload;