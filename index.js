const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};
const basename = path.basename(__filename);

// instantiate sequelize with Database Config
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.dialect,
        port: config.port,
        storage: config.db.storage
    }
);

fs
    // Get current Directory
    .readdirSync(__dirname)

    // Get only js files that are NOT index.js
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) ==='.js')
    )
    // Add sequelized Database tables to Database Array
    .forEach((file) => {
        const model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;