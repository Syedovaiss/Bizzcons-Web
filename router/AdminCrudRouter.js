const express = require('express')
const router = express.Router()
var multer = require('multer')
const controller = require('../controller/AdminCrudController')

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString() + file.originalname.replace(/\s+/g, ''));
        }
    });

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'|| file.mimetype === 'images/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer(
    {
        storage: storage,
        limits:
        {
            fileSize: 1024 * 1024 * 50
        },
        fileFilter: fileFilter
    });

router.get('/create', controller.newAdmin)

router.post('/create', upload.single('file'), controller.createAdmin)
router.get('/all', controller.getAllAdmins)


module.exports = router
