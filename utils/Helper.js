const bcrypt = require('bcrypt')
const appConstants = require('./Constants')
const randomString = require('randomstring')
const path = require('path')

module.exports = {

    generatePassword: (password) => {

        return bcrypt.hashSync(password, appConstants.SALT_ROUNDS)
    },

    comparePassword: (password, hash) => {

        return bcrypt.compareSync(password, hash)

    },

    generateToken: () => {
        return randomString.generate()
    },

    checkFileType: (file, cb) => {

        // Allowed ext
        const filetypes = /jpeg|jpg|png|svg/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb('Error: Images Only!');
        }

    },
    createFileUrl: (file) => {
        return process.env.BASE_URL + "/" + file.path.replace("public/", "")
    }
}