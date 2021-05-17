
const express = require('express')
const router = express.Router()
const controller = require('../controller/ProjectController')
var multer = require('multer')


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


router.get('/admin/projects/add', controller.renderProjects)

router.post('/admin/projects/create', upload.array('file'), controller.addProject)

router.get('/admin/projects/all',controller.getAllProjects)

router.get('/admin/projects/:id',controller.getProjectDetails)

router.get('/admin/projects/delete/:id',controller.deleteProject)


module.exports = router
