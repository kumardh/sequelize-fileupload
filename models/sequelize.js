const Sequelize = require('sequelize');
const CategoryModel = require('./category');

const sequelize = new Sequelize('testdb', 'postgres', 'Manav2020#', {
    host : 'localhost',
    dialect: 'postgres'
});

const Category = CategoryModel(sequelize, Sequelize);

//Pass { force: true } as option if you want to force delete and recreate.
sequelize.sync() 
  .then(() => {
    console.log(`Database & tables created!`)
});

module.exports = {
    Category
}