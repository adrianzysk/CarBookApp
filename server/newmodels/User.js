const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const User = sequelize.define('User', {
    idUser: {
        type : Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
})
module.exports = User;