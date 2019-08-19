const Sequelize = require('sequelize');
const CategoryModel = require('./category');

const sequelize = new Sequelize('testdb', 'postgres', 'Manav2020#', {
    host : 'localhost',
    dialect: 'postgres'
});

const Category = CategoryModel(sequelize, Sequelize);

sequelize.sync() //Pass this option if you want to force delete and recreate. { force: true }
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
    Category
}