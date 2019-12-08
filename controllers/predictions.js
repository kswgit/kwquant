const router = new require("koa-router")();
const models = require('../models')

router.get('/', async (ctx, next) => {
    console.log(ctx.request.query)
})

module.exports = router.routes();