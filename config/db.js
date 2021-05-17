const Sequelize = require('sequelize')
// module.exports = new Sequelize('bizzcons_prod', 'bizzcons_bizzcons_admin_prod', 'newP@ssw0rd', { dialect: 'mysql' })
module.exports = new Sequelize('heroku_0afea414819c4a6', 'ba380f112e57c6', 'bbc03c60', { dialect: 'mysql', host:'us-cdbr-east-03.cleardb.com' })

//mysql://ba380f112e57c6:bbc03c60@us-cdbr-east-03.cleardb.com/heroku_0afea414819c4a6?reconnect=true