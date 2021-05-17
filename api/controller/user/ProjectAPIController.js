const Project = require('../../../models/admin/Project')
const Sequelize = require('sequelize')
exports.getAllProjects = async (req, res) => {

    const page = req.params.page

    const limit = 10

    const startIndex = (page - 1) * limit

    const endIndex = page * limit

    await Project.findAll({
        where: {
            project_id: {
                [Sequelize.Op.gte]: startIndex,
                [Sequelize.Op.lte]: endIndex
            }
        }
    }).then(project => {

        res.status(200).json({
            data: project,
            success: true,
            error: ""
        })

    }).catch(error => {
        res.status(500).json({
            message: "",
            success: "",
            error: error
        })
    })
}

