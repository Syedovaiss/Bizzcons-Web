
const express = require('express')
const router = express.Router()
const controller = require('../controller/NewsController')


router.get('/admin/news/new', controller.renderCreateNews)

router.post('/admin/create/new/news', controller.createNews)


router.get('/admin/news/all',controller.getAllNews)

router.get('/admin/news/delete/:id',controller.deleteNews)

module.exports = router
