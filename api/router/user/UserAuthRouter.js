const express = require('express')
const router = express.Router()
const controller = require('../../../api/controller/user/UserAuthController')
const checkAuth = require('../../middlewares/CheckAuth')

const multer = require('multer')
const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/');
        },
        filename: function (req, file, cb) {
            cb(null,new Date().toISOString() +  file.originalname.replace(/\s+/g, '') );
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

router.post('/public/user/signup',upload.single('profileImage'),controller.registerUser)

router.post('/public/user',controller.loginUser)

router.get('/user',checkAuth,controller.getUserInfo)

router.post('/user/update',checkAuth,upload.single('profileImage'),controller.updateUser)

router.post('/user/change-password',checkAuth,controller.changePassword)

module.exports = router
