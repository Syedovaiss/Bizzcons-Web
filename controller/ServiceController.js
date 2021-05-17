const { name } = require('ejs')
const e = require('express')
const Service = require('../models/admin/Service')

/**
 * 
 
                          House Renovation
                          Construction
                          Interior & Exterior designing
                          Laminate flooring
                          Re-Modeling
                          Smart Solar Solutions
 */
exports.renderCreateServices = async (req, res) => {

    if (req.session.isLoggedIn) {
        var name = req.session.name
        res.render("add-services", { name: name })
    } else {
        res.redirect('/admin/login')
    }
}


exports.addService = async (req, res) => {

    var title = req.body.service_title
    var serviceDescription = req.body.service_desc
    var category = req.body.category
    //todo add image for service

    await Service.create({
        service_title: title,
        service_type: category,
        service_description: serviceDescription

    }).then(data => {
        console.log("Added Successfully")
        res.redirect('/admin/service/create')

    }).catch(error => {
        console.log(error)
    })



}


exports.getAllServices = async (req, res) => {
    if (req.session.isLoggedIn) {
        await Service.findAll().then(data => {
            res.render("service-all", { services: data, name: req.session.name })
        }).catch(error => {
            console.log(error)
        })
    

    } else {
        res.redirect('/admin/login')
    }
  

}

exports.getServiceDetails = async (req, res) => {

    if(req.session.isLoggedIn){
        const id = req.params.id
        await Service.findOne({ where: { service_id: id } }).then(data => {
            res.render("service-detail", { service: data, name: req.session.name })
        }).catch(error => {
            console.log(error)
        })

    } else {
        res.redirect('/admin/login')
    }
   

}