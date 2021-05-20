const db = require('../../config/db')
const Sequelize = require('sequelize')

const Blog = db.define('blogs', {
    blog_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true

    },
    blog_title: {
        type: Sequelize.TEXT

    },
    blog_sub_title: {
        type: Sequelize.TEXT
    },
    blog_description: {
        type: Sequelize.TEXT
    },
    blog_header_image: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: true,
    freezeTableName: true
}
)

module.exports = Blog