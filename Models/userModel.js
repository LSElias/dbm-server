const { DataTypes } = require("sequelize");

const UserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  roleId:{
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING(20),
  },
  password: {
    type: DataTypes.STRING(250),
  },
  email: {
    type: DataTypes.STRING(250),
  },
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define("user", UserModel, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });

  },

  createUser: (user) => {
    return this.model.create(user);
  },

  findUser: (query) => {
    return this.model.findOne({
      where: query,
      attributes: ['id', 'username', 'password','email']
    });
  },

  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllUsers: (query) => {
    return this.model.findAll({
      where: query,
      attributes: ['id', 'username','email']
    });
  },

  deleteUser: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
