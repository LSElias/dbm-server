const { DataTypes } = require("sequelize");

const rolesModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(20),
  }
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define("roles", rolesModel,
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  },

  findRoles: (query) => {
    return this.model.findOne({
      where: query,
      attributes: ['id', 'name']
    });
  },

  findAllRoles: (query) => {
    return this.model.findAll({
      where: query,
      attributes: ['id', 'name']
    });
  },

};
