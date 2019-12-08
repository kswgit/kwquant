const router = new require("koa-router")();
const prediction = require('../services/prediction')
const lib = require('../services/lib')
const models = require('../models')


router.get('/', async (ctx, next) => {
    const interests = lib.INTERESTS
    const period = 30
    const invest = 27720
    const lambdas = await prediction.Lambdas(27720)
    const probabilities = lambdas.map(l => lib.ExponentialDistribution(l, period))
    
    ctx.body = {
        period,
        invest,
        expectations: probabilities.map((p, idx) => (
            {
                interests: `${interests[idx] * 100}%`,
                expectation: invest * interests[idx],
                probability: `${p*100}%`
            })
        )
    }
})

module.exports = router.routes();