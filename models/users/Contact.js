const db = require('../../config/db')
const Sequelize = require('sequelize')

const Contact = db.define('contacts', {
    contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.TEXT,
    },
    last_name: {
        type: Sequelize.TEXT

    },
    email: {
        type: Sequelize.TEXT,
    },
    message: {
        type: Sequelize.TEXT

    }
}, {
    timestamps: true,
    freezeTableName: true
}
  )

module.exports = Contact