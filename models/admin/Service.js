const db = require('../../config/db')
const Sequelize = require('sequelize')

const Service = db.define('services', {
    service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    },
    service_title: {
        type: Sequelize.TEXT

    },
    service_description: {
        type: Sequelize.TEXT
    },
    service_type : {
        type:Sequelize.TEXT
    }
}, {
    timestamps: true,
    freezeTableName: true
}
)

module.exports = Service