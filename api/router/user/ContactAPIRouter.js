const express = require('express')
const router = express.Router()
const controller = require('../../../api/controller/user/ContactAPIController')
const checkAuth = require('../../middlewares/CheckAuth')


router.post('/contact',controller.postContact)



module.exports = router
