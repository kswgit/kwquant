const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const fs = require('fs');
const cors = require('@koa/cors');


const router = new Router({
    prefix: '/api/v1'
});

const controllers = fs.readdirSync('./controllers')
                        .filter(f => /[a-z]+\.js$/i.test(f))
                        .map(f => f.slice(0, -3))
controllers.forEach(filename => {
    router.use(`/${filename}`, require(`./controllers/${filename}`))
    console.log(`/${filename}에 ./controllers/${filename}.js 등록`)
})

const app = new Koa();

app.use(BodyParser());
app.use(router.routes())
app.use(cors())

app.listen(3001);