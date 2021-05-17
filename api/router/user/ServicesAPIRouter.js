const express = require('express')
const router = express.Router()
const controller = require('../../../api/controller/user/ServiceApiController')


router.get('/services',controller.getServices)


module.exports = router
