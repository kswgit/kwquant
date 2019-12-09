const Sequelize = require('sequelize');
const models = require('../models');

stockSamples = [
  {
    code: '069500.KS',
    description: 'KODEX200'
  },
  {
    code: '114800.KS',
    description: 'KODEX인버스'
  },
  {
    code: '122630.KS',
    description: 'KODEX 레버리지'
  }
]

models.sequelize.sync()
  .then(() => {
    stockSamples.forEach(element => models.stocks.create(element));
  }) 