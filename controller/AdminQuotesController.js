
const Quote = require('../models/users/Quotes')

exports.renderRecentQuotes = async (req, res) => {

    if (req.session.isLoggedIn) {

        await Quote.findAll({ order: [['quote_id', 'DESC']], limit: 10 }).then(data => {
            console.log(data)
            res.render("recent-quotes", { quotes: data, name: req.session.name })

        }).catch(error => console.log(error))
    } else {
        res.redirect('/admin/login')
    }

}

exports.renderAllQuotes = async (req, res) => {
    if (req.session.isLoggedIn) {

        await Quote.findAll({ order: [['quote_id', 'DESC']] }).then(data => {
            console.log(data)
            res.render("past-quotes", { quotes: data, name: req.session.name })

        }).catch(error => console.log(error))

    } else {
        res.redirect('/admin/login')
    }


}

exports.quoteDetail = async (req, res) => {
    if (req.session.isLoggedIn) {
        const id = req.params.id
        await Quote.findOne({ where: { quote_id: id } }).then(data => {
            res.render("quote-details", { quote: data, name: req.session.name })
        }).catch(error => {
            console.log(error)
        })

    } else {
        res.redirect('/admin/login')
    }
}