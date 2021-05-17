
const News = require('../models/admin/News')
const Blog = require('../models/admin/Blogs')
const Quotes = require('../models/users/Quotes')
const Admin = require('../models/admin/Admin')
const Project = require('../models/admin/Project')
const User = require('../api/model/User')


exports.renderDashboard = async (req, res, next) => {


    if (req.session.isLoggedIn) {
        var news;
        var quotes;
        var blogs;
        var totalAdmins;
        var totalProjects;
        var totalQuotes;
        var totalUsers;

        var totalCounts = []


        await Quotes.count('quotes_id').then(data => {
            totalQuotes = data
            totalCounts.push(totalQuotes)
        })

        await Admin.count('admin_id').then(data => {
            totalAdmins = data
            totalCounts.push(totalAdmins)
        })
        await Project.count('project_id').then(data => {
            totalProjects = data
            totalCounts.push(totalProjects)
        })
        await User.count('user_id').then(data => {
            totalUsers = data
            totalCounts.push(totalUsers)
        })


        await Blog.findAll({ order: [['blog_id', 'DESC']], limit: 3 }).then(data => {
            blogs = data

        }).catch(error => { console.log(error) })

        await Quotes.findAll({ order: [['quote_id', 'DESC']], limit: 3 }).then(data => {
            quotes = data

        }).catch(error => { console.log(error) })

        await News.findAll({ order: [['news_id', 'DESC']], limit: 3 }).then(data => {
            news = data

        }).catch(error => { console.log(error) })

        var name = req.session.name
        res.render("admin-home", {
            name: name,
            recentBlogs: blogs,
            recentNews: news,
            recentQuotes: quotes,
            count: totalCounts
        })

    } else {
        res.redirect("/admin/login")

    }
}

exports.logoutAdmin = (req, res) => {
    req.session.destroy()
    res.redirect('/admin/login')
}

