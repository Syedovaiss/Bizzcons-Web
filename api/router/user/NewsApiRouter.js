const express = require('express')
const router = express.Router()
const controller = require('../../../api/controller/user/NewsApiController')
const checkAuth = require('../../middlewares/CheckAuth')


router.get('/news/all',checkAuth,controller.getNews)



module.exports = router
