
const { DataTypes } = require("sequelize");

const imageModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(20),
  },
  image: {
    type: DataTypes.BLOB,
  },
  date:{
    type: DataTypes.DATE,
  },
  idUser: {
    type: DataTypes.INTEGER
  }
};

module.exports = {
  initialize: (sequelize) => {
    this.model = sequelize.define("images", imageModel,    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  },

  create: (image) => {
    return this.model.create(image);
  },

  find: (query) => {
    return this.model.findOne({
      where: query,
      attributes: ['id', 'name','image','date', 'idUser']
    });
  },

  update: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAll: (query) => {
    return this.model.findAll({
      where: query,
      attributes: ['id', 'name','image','date', 'idUser']
    });
  },

  delete: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
