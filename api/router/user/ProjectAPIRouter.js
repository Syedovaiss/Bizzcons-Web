const express = require('express')
const router = express.Router()
const controller = require('../../../api/controller/user/ProjectAPIController')
const checkAuth = require('../../middlewares/CheckAuth')


router.get('/projects/all/:page',controller.getAllProjects)



module.exports = router
