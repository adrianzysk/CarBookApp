const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const Vehicle = sequelize.define('Vehicle', {
    idVehicle: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    idUser:{
        type : Sequelize.INTEGER,
    },
    brand: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    model: {
        type: Sequelize.STRING,
        defaultValue: '',
    },
    productionDate: {
        type: Sequelize.STRING,
    },
    examinationDate: {
        type: Sequelize.STRING,
    },
    insuranceDate: {
        type: Sequelize.STRING,
    },

})
module.exports = Vehicle;