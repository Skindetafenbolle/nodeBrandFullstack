const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Brand = sequelize.define('Brand', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    foundationDate: {
        type: DataTypes.DATE,
    },
    logoURL: {
        type: DataTypes.STRING,
    },
    socialLinks: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
});

module.exports = Brand;
