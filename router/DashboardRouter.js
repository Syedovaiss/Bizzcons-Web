const express = require('express')
const router = express.Router()
const controller = require('../controller/DashboardController')

router.get('/dashboard', controller.renderDashboard)

router.post('/logout',controller.logoutAdmin)

module.exports = router
