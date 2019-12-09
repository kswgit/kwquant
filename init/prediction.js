const Sequelize = require('sequelize');
const _ = require('lodash')
const models = require('../models');
const lib = require('../services/lib')

const Op = Sequelize.Op

const Expectation = async (interest) => {
    const code = "069500.KS"

    const stock =  await models.stocks.findAll({
        where: { code },
    })
    const stockId = stock[0].id
    const prices = await models.prices.findAll({
        where: { stockId },
    })
    let sum = 0
    let cnt = 0

    const priceCondition = interest > 0 ? Op.gte : Op.lte

    for(let i = 0; i < prices.length; i++) {
        p1 = prices[i]
        p2 = p1.price + p1.price * interest
        const p3 = await models.prices.findAll({
            where: {
                stockId,
                price: {
                    [priceCondition]: p2
                },
                date: {
                    [Op.gt]: p1.date,
                }
            },
            order: [[ 'date', 'ASC' ]],
            limit: 1
        })
        
        if (p3.length < 1) { continue; }
        
        sum += lib.Interdate(p1.date, p3[0].date)
        cnt ++
    }
    console.log(interest, `${prices.length - cnt}/${prices.length}`)
    return sum / cnt
}

const main = async () => {
    const interests = lib.INTERESTS.reverse()
    const expectations = []
    for(let i = 0; i < interests.length; i++) {
        interest = interests[i]
        console.log(i, interest)
        expectations.push(await Expectation(interest))
    }
    expectations.map(e => {
        console.log(e)
    })
}

(async() => await main())();
