const Admin = require("../models/admin/Admin")
const helper = require('../utils/Helper')

exports.newAdmin = (req, res) => {
    if (req.session.isLoggedIn) {
        var name = req.session.name
        res.render("new-admin", { name: name })
    } else {
        res.redirect("/admin/login")
    }
}


exports.createAdmin = async (req, res, next) => {

    const name = req.body.fullname
    const email = req.body.email
    const adminPassword = req.body.password
    const adminConfirmPassword = req.body.confirmPassword
    const phone = req.body.phone
    const dob = req.body.dob
    const fb = req.body.fbURL
    const twitter = req.body.twitterURL
    const bio = req.body.bio
    const short_intro = req.body.short_intro
    var isExists = await Admin.findOne({ where: { 'email': email } })
    if (name === "") {
        req.flash('error', 'Name cannot be empty')
        res.redirect('/admin/create')

    } else if (email === "") {
        req.flash('error', 'Email cannot be empty')
        res.redirect('/admin/create')

    } else if (adminPassword === "") {
        req.flash('error', 'Password cannot be empty')
        res.redirect('/admin/create')

    }
    else if (phone === "") {
        req.flash('error', 'Phone cannot be empty')
        res.redirect('/admin/create')

    }
    else if (dob === "") {
        req.flash('error', 'Please enter a valid date of birth')
        res.redirect('/admin/create')

    }
    else if (isExists) {
        req.flash('error', 'User Already Exists')
        res.redirect('/admin/create')
    } else {
        if (adminPassword != adminConfirmPassword) {
            req.flash('error', 'Password Mismatch')
            res.redirect('/admin/create')
        } else if (req.file == undefined) {
            req.flash('error', 'Please upload picture')
            res.redirect('/admin/create')

        } else {

            await Admin.create({
                fullname: name,
                email: email,
                password: helper.generatePassword(adminPassword),
                phone: phone,
                dob: dob,
                facebook_url: fb,
                twitter_url: twitter,
                bio: bio,
                profile_pic: helper.createFileUrl(req.file),
                short_intro: short_intro
            }).then(data => {
                req.flash('success', 'Created Successfully')
                res.redirect('/admin/create')
            }).catch(error => {
                console.log(error);
                req.flash('error', 'Something went wrong')
                res.redirect('/admin/create')

            })

        }
    }

}

exports.getAllAdmins = async (req, res) => {
    if (req.session.isLoggedIn) {
        var name = req.session.name
        let admin = await Admin.findAll()
        res.render('admin-all', { adminData: admin, name: name })
    } else {
        res.redirect("/admin/login")
    }

}
