const News = require('../../../models/admin/News')
const Sequelize = require('sequelize')

exports.getNews = async (req, res) => {

	await News.findAll({
		where: {
			order: ['news_id', 'DESC'],
			limit: 10
		}
	}).then(news => {

		res.status(200).json({
			data: news,
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

