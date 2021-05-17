
const express = require('express')
const router = express.Router()
const controller = require('../controller/ServiceController')


router.get('/admin/service/create', controller.renderCreateServices)

router.post('/admin/service/create/new', controller.addService)


router.get('/admin/service/all',controller.getAllServices)

router.get('/admin/service/:id',controller.getServiceDetails)



module.exports = router
