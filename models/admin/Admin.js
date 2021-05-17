const db = require('../../config/db')
const Sequelize = require('sequelize')

const Admin = db.define('admin', {
    admin_id: {
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
    facebook_url: {
        type: Sequelize.TEXT

    },
    twitter_url: {
        type: Sequelize.TEXT

    },
    profile_pic: {
        type: Sequelize.TEXT

    },
    short_intro: {
        type: Sequelize.TEXT

    },
    bio: {
        type: Sequelize.TEXT

    }
}, {
    timestamps: true,
    freezeTableName: true
}
  )

module.exports = Admin