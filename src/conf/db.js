/**
 * @description 存储配置
 * @author wjh
 */
const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'koa2_weibo_db'
}

if( isProd ) {
  REDIS_CONF ={
    // 线上的redis 配置
    port: 6379,
    host: '127.0.0.1'
  }
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}
