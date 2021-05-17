const express = require('express')
const router = express.Router()
const controller = require('../controller/UserControllers')



router.get('/', controller.getHome)

router.get('/about', controller.getAboutUs)

router.get('/services', controller.getServices)

router.get('/projects', controller.getProjects)

router.get('/quote', controller.getQuote)

router.get('/projects/:id', controller.renderSingleProject)

router.get('/blogs',controller.renderBlogs)

router.get('/blogs/single/:id', controller.renderSingleBlog)

//post routes

router.post('/create/quote', controller.addQuotes)


module.exports = router
