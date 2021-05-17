const express = require('express')
const router = express.Router()
const controller = require('../controller/ProfileController')

router.get('/update/password',controller.renderUpdatePassword)
router.post('/update/password',controller.updatePassword)
router.get('/update/info',controller.getProfile)
router.post('/update/info', controller.updateAdmin)
router.post('/delete/:adminId', controller.deleteAdmin)
module.exports = router
