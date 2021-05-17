const db = require('../../config/db')
const Sequelize = require('sequelize')

const User = db.define('user', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fullname: {
        type: Sequelize.TEXT,
    },
    email: {
        type: Sequelize.TEXT

    },
    password: {
        type: Sequelize.TEXT,
    },
    phone: {
        type: Sequelize.TEXT

    },
    dob: {
        type: Sequelize.TEXT

    },
    address: {
        type: Sequelize.TEXT
    },
    profile_pic: {
        type: Sequelize.TEXT

    }
}, {
    timestamps: true,
    freezeTableName: true
}
)

module.exports = User