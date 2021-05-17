const Quotes = require('../models/users/Quotes')
const Project = require('../models/admin/Project')
const News = require('../models/admin/News')
const Blogs = require('../models/admin/Blogs')


exports.getHome = async (req, res) => {
    var recentNews;
    var recentProjects;
    var parsedImages = []
    var projectImages = []
    await News.findAll({ order: [['news_id', 'DESC']], limit: 3 }).then(async (news) => {
        recentNews = news
    }).catch(error => {
        console.log(error)
    })
    await Project.findAll({ order: [['project_id', 'DESC']], limit: 3 }).then(async (data) => {
        recentProjects = data
        for (var i = 0; i < data.length; i++) {
            parsedImages.push(JSON.parse(data[i].project_image))
            projectImages.push(parsedImages[i][0])

        }

    }).catch(error => {
        console.log(error)
    })
    res.render("index", { projects: recentProjects, headlines: recentNews, images: projectImages })


}


exports.getAboutUs = async (req, res) => {
    var recentNews;
    await News.findAll({ order: [['news_id', 'DESC']], limit: 3 }).then(async (news) => {
        recentNews = news
    }).catch(error => {
        console.log(error)
    })

    res.render("about", { headlines: recentNews })


}



exports.getServices = async (req, res) => {


    var recentNews;
    await News.findAll({ order: [['news_id', 'DESC']], limit: 3 }).then(async (news) => {
        recentNews = news
    }).catch(error => {
        console.log(error)
    })
    res.render("services", { headlines: recentNews })

}

exports.getProjects = async (req, res) => {

    var recentNews;
    var recentProjects;
    var parsedImages = [];

    var image = []

    await News.findAll({ Iorder: [['news_id', 'DESC']], limit: 3 }).then(async (news) => {
        recentNews = news

    }).catch(error => {
        console.log(error)
    })

    await Project.findAll({ order: [['project_id', 'DESC']] }).then(async (data) => {
        recentProjects = data
        for (var i = 0; i < data.length; i++) {
            image.push(JSON.parse(data[i].project_image))
            parsedImages.push(image[i][0])
        }

    }).catch(error => {
        console.log(error)
    })

    res.render("projects", { projects: recentProjects, headlines: recentNews, images: parsedImages })




}

exports.renderBlogs = async (req, res) => {
    var recentBlogs;
    var recentNews;

    await News.findAll({ Iorder: [['news_id', 'DESC']], limit: 3 }).then(async (news) => {
        recentNews = news


    }).catch(error => {
        console.log(error)
    })

    await Blogs.findAll({ order: [['blog_id', 'DESC']] }).then(async (data) => {
        recentBlogs = data

    }).catch(error => {
        console.log(error)
    })

    res.render("blogs", { headlines: recentNews, blogs: recentBlogs })


}

exports.getQuote = async (req, res) => {

    var recentNews;
    await News.findAll({ order: [['news_id', 'DESC']], limit: 3 }).then(async (news) => {
        recentNews = news

    }).catch(error => {
        console.log(error)
    })
    res.render("quote", { headlines: recentNews })


}

exports.addQuotes = async (req, res) => {
    await Quotes.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        about_company: req.body.your_company,
        about_project: req.body.your_project

    }).then(onSuccess => {
        req.flash('success', 'Successfully Sent.We will contact you soon.')
        res.redirect('/quote')

    }).catch(error => {
        console.log(error)
        req.flash('error', 'Something went wrong')
    })
}


exports.renderSingleProject = async (req, res) => {
    var recentNews;
    await News.findAll({ order: [['news_id', 'DESC']], limit: 3 }).then(news => { recentNews = news }).catch(error => {
        console.log(error)
    })

    const projectID = req.params.id
    await Project.findOne({ where: { 'project_id': projectID } }).then(data => {
        var parsedImages = JSON.parse(data.project_image)

        res.render("single-project", { project: data, headlines: recentNews, projectImages: parsedImages })
    }).catch(error => {

        console.log(error)
    })
}

exports.renderSingleBlog = async (req, res) => {
    var recentNews;
    await News.findAll({ order: [['news_id', 'DESC']], limit: 3 }).then(news => { recentNews = news }).catch(error => {
        console.log(error)
    })

    const blogID = req.params.id
    await Blogs.findOne({ where: { 'blog_id': blogID } }).then(data => {

        res.render("blog-single", { blogs: data, headlines: recentNews })
    }).catch(error => {

        console.log(error)
    })
}