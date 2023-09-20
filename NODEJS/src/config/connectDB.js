const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('phamdinhba12345', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,

});
sequelize.Promise = global.Promise;

let connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
module.exports = connectDB;