const Project = require('../models/admin/Project')
const helper = require('../utils/Helper')

var imageURLS = []

exports.renderProjects = async (req, res) => {
    if (req.session.isLoggedIn) {
        const name = req.session.name
        res.render("create-project", { name: name })

    } else {
        res.redirect('/admin/login')

    }
}

exports.addProject = async (req, res) => {

    var title = req.body.project_title
    var projectImages = req.files
    var projectDetails = req.body.project_info
    if (title === "") {
        req.flash('error', 'Please add project title')
        res.redirect('/admin/projects/add')

    } else if (projectDetails === "") {
        req.flash('error', 'Please add project details')
        res.redirect('/admin/projects/add')

    } else if (projectImages === undefined) {
        req.flash('error', 'Please upload atleast one project image')
        res.redirect('/admin/projects/add')
    }

    else {

        for (var i = 0; i < projectImages.length; i++) {
            imageURLS.push(helper.createFileUrl(projectImages[i]))
        }
        var count = 0
        await Project.count('project_id').then(data => {
            count = data
        }).catch(error => {
            console.log("error: " + error)
        })
        await Project.create({
            project_id: count + 1,
            project_title: title,
            project_image: JSON.stringify(imageURLS),
            project_description: projectDetails

        }).then(data => {
            console.log(data)
            req.flash('success', 'Created Successfully')
            res.redirect('/admin/projects/add')

        }).catch(error => {
            req.flash('error', 'Something went wrong')
            console.log(error)
        })
        imageURLS = []
    }



}

exports.getAllProjects = async (req, res) => {

    var projectImages = []
    if (req.session.isLoggedIn) {
        await Project.findAll().then(data => {
            for (var i = 0; i < data.length; i++) {
                var parsedImages = JSON.parse(data[i].project_image)
                projectImages.push(parsedImages)
            }
            var imageArray = [];
            imageArray.push(projectImages[0][0])
            imageArray.push(projectImages[0][1])
            imageArray.push(projectImages[0][2])
            console.log(imageArray)
            res.render("project-all", { projects: data, name: req.session.name, images: imageArray })

        }).catch(error => {
            console.log(error);
        })

    } else {
        res.redirect('/admin/login')

    }


}


exports.getProjectDetails = async (req, res) => {
    if (req.session.isLoggedIn) {
        var projectID = req.params.id
        await Project.findOne({ where: { project_id: projectID } }).then(data => {

            var parsedImages = JSON.parse(data.project_image)
            res.render("single-project-admin", { project: data, name: req.session.name, projectImages: parsedImages })
        }).catch(err => {
            console.log(err)
        })
    } else {


        res.redirect('/admin/login')
    }

}

exports.deleteProject = async (req, res) => {
    var projectID = req.params.id
    console.log(projectID)
    await Project.findOne({ where: { 'project_id': projectID } }).then(data => {
        data.destroy()
        res.redirect('/admin/projects/all')
    }).catch(error => {
        console.log(error)
    })
}

