const Admin = require('../../../models/admin/Admin')
const helpers = require('../../../utils/Helper')


exports.registerAdmin = async(req, res) => {

    const fullName = req.body.fullName
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const profile = req.file
    console.log(req.body)
    var errorMessage = ""
    var successMessage = ""

    if (email === "") {
        errorMessage = "Email can't be empty"
        res.status(406).json({
            message: "",
            error: errorMessage,
            success: false
        })

    } else if (password === "") {
        errorMessage = "Password can't be empty"
        res.status(406).json({
            message: "",
            error: errorMessage,
            success: false
        })
    } else {

        await Admin.findOne({ where: { 'email': email } }).then(async(data) => {
            if (data) {
                errorMessage = "Admin Already Exists"
                res.status(406).json({
                    message: "",
                    error: errorMessage,
                    success: false
                })
                return

            } else {
                await Admin.create({
                    fullname: fullName,
                    email: email,
                    password: helpers.generatePassword(password),
                    phone: phone,
                    profile_pic: helpers.createFileUrl(profile)


                }).then(data => {
                    successMessage = "Registered Successfully"
                    res.status(200).json({
                        message: successMessage,
                        error: "",
                        success: true
                    })

                }).catch(err => {
                    res.status(500).json({
                        message: "",
                        error: err,
                        success: false
                    })

                })


            }

        }).catch(err => {
            res.status(500).json({
                message: "",
                error: err,
                success: false
            })

        })



    }


}