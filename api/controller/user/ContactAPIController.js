const Contact = require('../../../models/users/Contact')

exports.postContact = async (req, res) => {

    const firstName = req.body.fullname
    const lastName = ""
    const email = req.body.email
    const message = req.body.message

    await Contact.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        message: message
    }).then(data => {
        res.status(200).json({
            message: "Successfully sent",
            errors: "",
            success: true
        })
    }).catch(err => {
        res.status(500).json({
            message: "",
            errors: err,
            success: false
        })
    })
}

