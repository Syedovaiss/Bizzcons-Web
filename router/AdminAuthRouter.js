const express = require('express')
const router = express.Router()
const controller = require('../controller/AdminAuthController')

router.get('/login',controller.loginAdmin)

router.get('/forgot',controller.forgotPassword)

router.post('/login',controller.getLoggedInAdmin)

router.post('/forgot',controller.sendToken)
module.exports = router
