const News = require('../models/admin/News')

exports.renderCreateNews = async (req, res) => {

    if (req.session.isLoggedIn) {
        var name = req.session.name
        res.render("create-news", { name: name })
    } else {
        res.redirect('/admin/login')
    }
}

exports.createNews = async (req, res) => {

    var title = req.body.newsTitle
    console.log(title)
    if (title === "" || title===undefined) {
        req.flash('error', 'Please add title')
        res.redirect('/admin/news/new')

    } else {
        await News.create({
            news_title: title

        }).then(data => {
            req.flash('success', 'News Added Successfully')
            res.redirect('/admin/news/new')

        }).catch(error => {
            console.log(error)
            req.flash('error', 'Something went wrong')
            res.redirect('/admin/news/new')
        })

    }

}



exports.getAllNews = async (req, res) => {
    await News.findAll({
        order: [
            ['news_id', 'DESC']
        ]
    }).then(data => {
        res.render("news-all", { news: data, name: req.session.name })
    }).catch(error => {
        console.log(error)
    })

}

exports.deleteNews = async (req, res) => {
    await News.findOne({ where: { 'news_id': req.params.id } }).then(data => {
        News.destroy({ where: { 'news_id': req.params.id } }).then(data => {
            req.flash('success', 'Deleted Successfully')
            res.redirect('/admin/news/all')
            console.log("deleted Successfully")
        }).catch(error => {
            console.log(error)
        })

    }).catch(error => {

        req.flash('error', 'Something went wrong')
    })
}

