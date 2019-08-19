module.exports = (sequelize, DataTypes) => {
    return sequelize.define('category', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        poster: DataTypes.STRING,
      },
      {
        freezeTableName: true // Model tableName will be the same as the model name
      }
    )
}