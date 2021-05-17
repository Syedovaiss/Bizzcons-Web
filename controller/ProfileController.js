const Admin = require("../models/admin/Admin")
const helper = require("../utils/Helper")

exports.renderUpdatePassword = async (req, res) => {

	if (req.session.isLoggedIn) {
		var name = req.session.name
		res.render("change-password", { name: name })

	} else {
		res.redirect('/admin/login')
	}

}

exports.updatePassword = async (req, res) => {
	var oldPassword = req.body.oldPassword
	var newPassword = req.body.newPassword
	var confirmPassword = req.body.confirmPassword
	if (newPassword != confirmPassword) {
		req.flash('error', 'Password Mismatch')
		res.redirect('/admin/update/password')

	} else {
		await Admin.findOne({ where: { 'email': req.session.email } }).then(data => {

			var isPassword = helper.comparePassword(oldPassword, data.password)
			if (!isPassword) {
				req.flash('error', 'Please enter a valid old password')
				res.redirect('/admin/update/password')

			} else {
				var newPasswordHash = helper.generatePassword(newPassword)
				data.update({ password: newPasswordHash }).then(success => {
					req.flash('success', 'Password Changed Successfully')
					res.redirect('/admin/update/password')

				}).catch(error => {

					req.flash('error', 'Something went wrong')
					res.redirect('/admin/update/password')
				})

			}


		}).catch(error => {
			req.flash('error', 'Something went wrong')
			res.redirect('/admin/update/password')

		})

	}




}

exports.getProfile = async(req,res)=>{
	if (req.session.isLoggedIn) {

        const adminId = req.session.adminID
        var name = req.session.name
        await Admin.findOne({ where: { 'admin_id': adminId } }).then(adminInfo => {

            res.render("admin-detail", { data: adminInfo, name: name })

        }).catch(err => {
            res.redirect("/admin/login")
            console.log(err)
        })


    } else {
        res.redirect("/admin/login")
    }
}


exports.updateAdmin = async (req, res) => {

    var id = req.session.adminID
    await Admin.findOne({ where: { admin_id: id } }).then(data => {
        if (data) {
            data.update({
                fullname: req.body.fullname,
                phone: req.body.phone,
                facebook_url: req.body.fb_url,
                twitter_url: req.body.twitter_url,
                short_intro: req.body.short_intro,
                bio: req.body.bio
            }).then(success => {
                res.redirect('/admin/all')
                console.log("Updated Successfully")
            }).catch(error => {
                console.log(error)
            })
        }
    }).catch(error => {
        console.log(error)
    })


}


exports.deleteAdmin = async (req, res) => {
    var id = req.session.adminID
    await Admin.findOne({ where: { admin_id: id } }).then(data => {
        if (data) {
            data.destroy().then(success => {
                if (id == req.session.adminID) {
                    req.session.destroy()
                    res.redirect("/admin/login")
                } else {
                    res.redirect('/admin/dashboard')
                }

            }).catch(err => {
                console.log(err)
            })
        }

    }).catch(error => {
        console.log(error)
    })
}
