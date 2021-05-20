const db = require('../../config/db')
const Sequelize = require('sequelize')

const Project = db.define('projects', {
    
    project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true

    },
    project_title: {
        type: Sequelize.TEXT

    },
    project_description: {
        type: Sequelize.TEXT
    },
    project_image : {
        type:Sequelize.TEXT
    }
}, {
    timestamps: true,
    freezeTableName: true
}
)

module.exports = Project