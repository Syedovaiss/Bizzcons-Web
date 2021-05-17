const randomString = require('randomstring')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin/Admin')
const helper = require('../utils/Helper')
const mailjet = require('node-mailjet').connect('5d80e6d004bff2e62cef7f586c6c4d81', '5e4f6661c385471dca8ef25e71b5b535')


exports.loginAdmin = (req, res, next) => {
    
    res.render("auth-login")
}

exports.forgotPassword = (req, res, next) => {
    res.render("forgot-password")
}


exports.getLoggedInAdmin = async (req, res, next) => {

    const email = req.body.email
    const password = req.body.password
    await Admin.findOne({ where: { 'email': email } }).then(data => {

        if (data) {
            var isPasswordCorrect = helper.comparePassword(password, data.password)
            if (isPasswordCorrect) {
                req.session.adminID = data.admin_id
                req.session.isLoggedIn = true
                req.session.name = data.fullname
                req.session.email = data.email
                
                res.redirect('/admin/dashboard')
                return
            }
            else {
                req.flash('error', "Invalid email and/or password.")
                res.redirect('/admin/login')
            }
        } else {
            req.flash('error', "Invalid email and/or password.")
            res.redirect('/admin/login')
        }
    }).catch(error => {
        req.flash('error', "Something went wrong.")
        res.redirect('/admin/login')
    })



}

exports.sendToken = async (req, res, next) => {
    const email = req.body.email
    console.log(email)
    const token = randomString.generate({
        length: 12,
        charset: 'hex'
    })
    await Admin.findOne({ where: { 'email': email } }).then(data => {
        if (data != null) {
            var newPassword = helper.generatePassword(token)
            data.update({
                password: newPassword
            }).then(success => {
                if (success) {
                    const request = mailjet.post("send", { 'version': 'v3.1' }).request({
                        "Messages": [
                            {
                                "From": {
                                    "Email": "umairengineer@gmail.com",
                                    "Name": "Bizzcons Support"
                                },
                                "To": [
                                    {
                                        "Email": email,
                                        "Name": data.fullname
                                    }
                                ],
                                "Subject": "Greetings from Bizzcons.Here is your new password",
                                "TextPart": "Here is your new password",
                                "HTMLPart": token,
                                "CustomID": "AppGettingStartedTest"
                            }
                        ]
                    })
                    request
                        .then((result) => {
                            req.flash('success', "Email Sent Successfully")
                            res.redirect('/admin/forgot')
                        })
                        .catch((err) => {
                            req.flash('error', "Unable to send emails.Plase try again later")
                            res.redirect('/admin/forgot')
                            console.log(err.statusCode)
                        })


                }

            }).catch(error => {
                console.log(error)
            })

        } else {
            req.flash('error', "Email doesn't exists")
            res.redirect('/admin/forgot')
        }
    }).catch(error => {
        req.flash('error', "Something went wrong.Please try again later")
        res.redirect('/admin/forgot')


    })

}