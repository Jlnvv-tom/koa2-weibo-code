const path = require('path')
const Koa = require('koa')
const app = new Koa()
const logger = require('koa-logger')
const json = require('koa-json')
const views = require('koa-views')
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { isProd } = require('./utils/env')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由 
const atAPIRouter = require('./routes/api/blog-at')
const squareAPIRouter = require('./routes/api/blog-square')
const profileAPIRouter = require('./routes/api/blog-profile')
const homeAPIRouter = require('./routes/api/blog-home')
const utilsAPIRouter = require('./routes/api/utils')
const blogViewRouter = require('./routes/view/blog')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter  = require('./routes/view/error')

// error handler
let onerrorConf = {}
if(isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf);

// global middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname,  '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 'koa.sid'
  prefix: 'weibo:sess:',// redis key 的前缀， 默认是 'koa:sess:'
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 *1000 // ms
  },
  store: redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger
app.use( async function (ctx,next){
  const start = new Date;
  await next()
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes definition
app.use(atAPIRouter.routes(), atAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods()) 
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404和error错误的路由放到最后面，因为加了 '*'匹配他后面的路由

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
