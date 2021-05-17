const db = require('../../config/db')
const Sequelize = require('sequelize')

const Quotes = db.define('quotes', {
    quote_id: {
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
    phone: {
        type: Sequelize.TEXT

    },
    about_company: {
        type: Sequelize.TEXT

    },
    about_project: {
        type: Sequelize.TEXT

    }
}, {
    timestamps: true,
    freezeTableName: true
}
  )

module.exports = Quotes