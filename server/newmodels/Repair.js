const Sequelize = require('sequelize');
const sequelize = require('../config/database')
const Repair = sequelize.define('Repair', {
    idRepair: {
        type : Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idVehicle: {
        type: Sequelize.INTEGER,
    },
    type: {
        type: Sequelize.STRING,
    },
    usedParts: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
})
module.exports = Repair;