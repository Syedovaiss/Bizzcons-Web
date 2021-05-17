
const Contact = require('../models/users/Contact')

exports.getRecentContacts = async (req, res) => {

    if (req.session.isLoggedIn) {
        await Contact.findAll({ order: [['contact_id', 'DESC']], limit: 10 }).then(data => {
            res.render("recent-contactsc", { name: req.session.name, contact: data })
        }).catch(error => { console.log(error) })

    } else {
        res.redirect("/admin/login")
    }

}

exports.getPastContacts = async (req, res) => {
    if (req.session.isLoggedIn) {
        await Contact.findAll({ order: [['contact_id', 'DESC']] }).then(data => {
            res.render("past-contacts", { name: req.session.name, contact: data })
        }).catch(error => { console.log(error) })

    } else {
        res.redirect("/admin/login")
    }

}