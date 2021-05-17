const express = require('express')
const router = express.Router()
const controller = require('../controller/AdminContactController')

router.get('/admin/recent-contacts',controller.getRecentContacts)


router.get('/admin/contacts',controller.getPastContacts)


module.exports = router
