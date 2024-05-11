const Sequelize = require('sequelize');
const conexaoBD = require('../util/dataBase');

const Produto = conexaoBD.define('produto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },

  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
}/*, {
    timestamps: false
}*/);

module.exports = Produto;