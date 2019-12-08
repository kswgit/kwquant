const fs = require('fs');
const parse = require('csv-parse');
const Sequelize = require('sequelize');
const models = require('../models');

(async () => {

const inputFiles = await (async () => [
    {
        stock: await models.stocks.findAll({ where: { code: "069500.KS" } }),
        path: 'data/kodex.csv'
    },
    {
        stock: await models.stocks.findAll({ where: { code: "114800.KS" } }),
        path: 'data/kodexinv.csv'
    },
    {
        stock: await models.stocks.findAll({ where: { code: "122630.KS" } }),
        path: 'data/kodexrev.csv'
    },
])()


inputFiles.forEach((e) => {
    fs.createReadStream(e.path)
    .pipe(parse({delimiter: ','}))
    .on('data', async csvrow => {
        date = csvrow[0].replace(/\./g, '-')
        console.log({
            stockId: e.stock[0].id,
            date: new Date(date),
            price: csvrow[1]
        })
        await models.prices.create({
            stockId: e.stock[0].id,
            date: new Date(date),
            price: csvrow[1]
        })
    })
    .on('end', () => { 
      console.log(e.code, e.path, "done");
    });
});

})();