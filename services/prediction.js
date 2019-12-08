const Sequelize = require('sequelize');
const _ = require('lodash')
const models = require('../models');
const lib = require('./lib')


const Op = Sequelize.Op

const InterarrivalTime = async (price1, price2, code="069500.KS") => {
    const epsilon = 0.01 //0.015 percent point = 쁠마 0.03percent point 오차 = 거래수수료

    const price1Error = price1 * epsilon
    const price2Error = price2 * epsilon

    const stock =  await models.stocks.findAll({
        where: { code },
    })
    const stockId = stock[0].id

    const price1Set = await models.prices.findAll({
        where: {
            stockId,
            price: {
                [Op.gte]: price1 - price1Error,
                [Op.lte]: price1 + price1Error,
            }
        },
        order: [[ 'date', 'DESC' ]],
        limit: 40
    })
    
    const priceSet = []

    for (let i = 0; i < price1Set.length; i++) {
        const p1 = price1Set[i]
        const p2 = await models.prices.findAll({
            where: {
                stockId,
                price: {
                    [Op.gte]: price2 - price2Error,
                    [Op.lte]: price2 + price2Error,
                },
                date: {
                    [Op.gt]: p1.date,
                }
            },
            order: [[ 'date', 'DESC' ]],
            limit: 1
        })
        
        if (!_.isEmpty(p2)) {
            priceSet.push({ p1, p2: p2[0] })
        }
    }


    const interarrivalTime = priceSet.map(({ p1, p2 }) => lib.Interdate(p1.date, p2.date))
    
    return interarrivalTime.map((e, idx) => ({
        price: priceSet[idx].p1,
        interarrivalTime: e
    }))
}

const Expectation = async (currentPrice, interest, date) => {
    const profit = currentPrice * (1 + interest)
    const iat = await InterarrivalTime(currentPrice, profit)
    const weight = iat.map(e => lib.Interdate(date, e.price.date))
    
    const weightsum = lib.Arraysum(weight)
    
    const weightedInterarrivalTime = lib.Arraysum(
        iat.map((ia, idx) => weight[idx] * ia.interarrivalTime)
    )

    return weightedInterarrivalTime / weightsum
}

const Lambda = async (currentPrice, interest, date) => 1 / await Expectation(currentPrice, interest, date)

const Lambdas = async (currentPrice) => {
    const interests = lib.INTERESTS
    const profits = interests.map(e => e * currentPrice)
    const lambdas = await Promise.all(profits.map((e, idx) => Lambda(currentPrice, interests[idx], new Date())))

    return lambdas
}

module.exports = {
    Lambdas
}