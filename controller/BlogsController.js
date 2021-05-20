const Blog = require('../models/admin/Blogs')
const helper = require("../utils/Helper")

exports.renderNewBlog = async (req, res) => {

    if (req.session.isLoggedIn) {
        var name = req.session.name
        res.render("new-blog", { name: name })
    } else {
        res.redirect('/admin/login')
    }
}

exports.createNewBlog = async (req, res) => {

    var file = req.file
    var title = req.body.blog_title
    var blogDescription = req.body.blog_desc
    var blogSubTitle = req.body.sub_title


    if (title === "") {
        req.flash('error', 'Please add title')
        res.redirect('/admin/create/blog/new')

    } else if (blogDescription === "") {
        req.flash('error', 'Please add description')
        res.redirect('/admin/create/blog/new')

    } else if (blogSubTitle === "") {
        req.flash('error', 'Please add subtitle')
        res.redirect('/admin/create/blog/new')
    } else if (file === undefined) {
        req.flash('error', 'Please upload blog image')
        res.redirect('/admin/create/blog/new')
    } else {
        var count = 0
        await Blog.count('blog_id').then(data => {
            count = data
        }).catch(error => {
            console.log("error: " + error)
        })
        await Blog.create({
            blog_id: count + 1,
            blog_title: title,
            blog_header_image: helper.createFileUrl(file),
            blog_description: blogDescription,
            blog_sub_title: blogSubTitle

        }).then(data => {
            req.flash('success', 'Created Successfully')
            res.redirect('/admin/create/blog/new')

        }).catch(error => {
            req.flash('error', 'Something went wrong')
            res.redirect('/admin/create/blog/new')
        })

    }

}




exports.getAllBlogs = async (req, res) => {
    if (req.session.isLoggedIn) {
        await Blog.findAll({
            order: [
                ['blog_id', 'DESC']
            ]
        }).then(data => {
            res.render("blogs-all", { blogs: data, name: req.session.name })
        }).catch(error => {
            console.log(error)
        })

    } else {

        res.redirect('/admin/login')

    }




}

exports.getSingleBlog = async (req, res) => {

    if (req.session.isLoggedIn) {
        var blogId = req.params.id
        await Blog.findOne({ where: { blog_id: blogId } }).then(data => {
            res.render("single-blog", { name: req.session.name, blog: data })
        }).catch(error => {

        })

    } else {
        res.redirect('/admin/login')

    }

}

exports.deleteBlog = async (req, res) => {
    var blogID = req.params.id
    if (req.session.isLoggedIn) {
        await Blog.findOne({ where: { 'blog_id': blogID } }).then(data => {
            data.destroy()
            req.flash('success', 'Deleted Successfully')
            res.redirect('/admin/blogs/all')
        }).catch(error => {
            console.log(error)
            req.flash('error', 'Something went wrong')
        })

    } else {
        res.redirect('/admin/login')
    }
}