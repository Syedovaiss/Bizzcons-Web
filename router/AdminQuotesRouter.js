const express = require('express')
const router = express.Router()
const controller = require('../controller/AdminQuotesController')

router.get('/recent-quotes',controller.renderRecentQuotes)

router.get('/quotations',controller.renderAllQuotes)

router.get('/quotes/:id',controller.quoteDetail)

module.exports = router
