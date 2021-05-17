const User = require("../../model/User")
const helpers = require('../../../utils/Helper')
const jwt = require('jsonwebtoken')


exports.registerUser = async(req, res) => {

    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const dob = req.body.dob
    const address = req.body.address
    const profilePic = req.file
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var errorMessage = ""
    var successMessage = ""

    var user = await User.findOne({ where: { email: email } })
    if (user) {
        errorMessage = "User already exists"
        res.status(406).json({ message: successMessage, success: false, error: errorMessage })
    } else {
        if (fullname === '') {
            errorMessage = "Fullname cannot be empty"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })
        } else if (email === '') {
            errorMessage = "Email cannot be empty"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })
        } else if (password.length < 6) {
            errorMessage = "Password can't be smaller than 6 characters"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })
        } else if (password.length > 20) {
            errorMessage = "Password can't be greater than 20 characters"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })
        } else if (phone === '') {
            errorMessage = "Phone number can't be empty"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })
        } else if (dob === '') {
            errorMessage = "Date of birth can't be empty"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })
        } else if (address === '') {
            errorMessage = "Address can't be empty"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })

        } else if (profilePic === undefined || profilePic === null) {
            errorMessage = "Please upload your profile pic"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })

        } else if (!email.match(emailRegex)) {
            errorMessage = "Please enter a valid email address"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })
        } else if (phone.length < 11 && phone.length > 13) {
            errorMessage = "Please enter a valid phone number"
            res.status(406).json({ message: successMessage, success: false, error: errorMessage })

        } else {

            await User.create({
                fullname: fullname,
                email: email,
                password: helpers.generatePassword(password),
                phone: phone,
                dob: dob,
                address: address,
                profile_pic: helpers.createFileUrl(profilePic)

            }).then(data => {
                if (data)
                    successMessage = "Successfully Registered"
                res.status(201).json({ message: successMessage, success: true, error: errorMessage })

            }).catch(error => {
                errorMessage = error
                res.status(500).json({ message: successMessage, success: false, error: errorMessage })
            })
        }
    }

}

exports.loginUser = async(req, res) => {

    const email = req.body.email
    const password = req.body.password

    await User.findOne({ where: { email: email } }).then(user => {

        if (user) {
            var isPassword = helpers.comparePassword(password, user.password)
            if (isPassword) {
                const expiresIn = "15d"
                const token = jwt.sign({
                        email: user.email,
                        userID: user.user_id
                    },
                    process.env.JWT_SECRET, {
                        expiresIn: expiresIn
                    })

                res.status(200).json({
                    message: "Authorization Successfull",
                    data: {
                        token: token,
                        expirationTime: expiresIn
                    },
                    error: ""
                })

            } else {
                res.status(406).json({
                    data: [],
                    success: false,
                    error: "Invalid email/password"
                })
            }

        } else {
            res.status(404).json({
                data: [],
                success: false,
                error: "Invalid email/password"
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            data: [],
            success: false,
            error: err
        })

    })

}

exports.getUserInfo = async(req, res) => {

    var email = req.userData.email
    await User.findOne({ where: { email: email } }).then(user => {


        res.status(200).json({
            data: {
                userID: user.user_id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                dateOfBirth: user.dob,
                address: user.address,
                profileImage: user.profile_pic
            },
            success: true,
            error: ""
        })


    }).catch(err => {
        console.log(err)
        res.status(500).json({
            data: [],
            success: false,
            error: err
        })

    })

}
exports.updateUser = async(req, res) => {

    var userID = req.body.userID

    await User.findOne({ where: { user_id: userID } }).then(data => {
        if (data) {

            data.update({
                fullname: req.body.fullname,
                phone: req.body.phone,
                dob: req.body.dob,
                address: req.body.address,
                profile_pic: helpers.createFileUrl(req.file)

            }).then(success => {

                res.status(200).json({
                    message: "Profile updated successfully",
                    success: true,
                    error: ""
                })
                return

            }).catch(error => {
                res.status(404).json({
                    message: "",
                    success: false,
                    error: "Failed to update user"
                })
            })

        } else {
            res.status(404).json({
                message: "",
                success: false,
                error: "Couldn't find user"
            })
            return
        }

    }).catch(err => {

        res.status(500).json({
            message: "",
            success: false,
            error: "Something went wrong"
        })
        return
    })

}

exports.changePassword = async(req, res) => {

    var userId = req.query.userID

    var oldPassword = req.query.oldPassword
    var newPassword = req.query.newPassword
    var confirmPassword = req.query.confirmPassword

    await User.findOne({ where: { user_id: userId } }).then(user => {
        if (user) {
            console.log(oldPassword)
            var isOldPasswordCorrect = helpers.comparePassword(oldPassword, user.password)
            if (isOldPasswordCorrect) {
                if (newPassword === confirmPassword) {

                    user.update({
                        password: helpers.generatePassword(newPassword)
                    }).then(data => {
                        res.status(200).json({
                            message: "Password updated successfully",
                            success: true,
                            error: ""
                        })
                        return

                    }).catch(error => {
                        res.status(500).json({
                            message: "",
                            success: false,
                            error: "Failed to update password"
                        })
                        return
                    })

                } else {
                    res.status(403).json({
                        message: "",
                        success: false,
                        error: "Password mismatch"
                    })
                    return


                }

            } else {
                res.status(403).json({
                    message: "",
                    success: false,
                    error: "Invalid Password"
                })
                return

            }

        } else {
            res.status(404).json({
                message: "",
                success: false,
                error: "Couldn't find user"
            })
            return
        }
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "",
            success: false,
            error: "Something went wrong"
        })
        return

    })
}