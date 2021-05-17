const express = require('express')
const router = express.Router()
const controller = require('../../../api/controller/user/BlogsController')
const checkAuth = require('../../middlewares/CheckAuth')


router.get('/blogs/all/:page',controller.getBlogs)



module.exports = router
