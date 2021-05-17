const Service = require('../../../models/admin/Service')

exports.getServices = async (req, res) => {

    await Service.findAll().then(services => {

        res.status(200).json({
            data: services,
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

