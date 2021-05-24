const Blogs = require('../../../models/admin/Blogs')
const Sequelize = require('sequelize')

exports.getBlogs = async (req, res) => {

    const page = req.params.page
    const limit = 10

    const startIndex = (page - 1) * limit

    const endIndex = page * limit


    await Blogs.findAll({
        where: {
            blog_id: {
                [Sequelize.Op.gte]: startIndex,
                [Sequelize.Op.lte]: endIndex
            }
        }
    }).then(blogs => {

        console.log("page no: " + page)
        res.status(200).json({
            data: blogs,
            success: true,
            error: "",
            nextPageNo: parseInt(page) + 1
        })

    }).catch(error => {
        res.status(500).json({
            message: "",
            success: "",
            error: error,
            nextPageNo: parseInt(page) + 1
        })
    })
}

