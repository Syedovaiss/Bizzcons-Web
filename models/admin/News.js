const db = require('../../config/db')
const Sequelize = require('sequelize')

const News = db.define('news', {
    news_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    news_title: {
        type: Sequelize.TEXT

    }
}, {
    timestamps: true,
    freezeTableName: true
}
)

module.exports = News