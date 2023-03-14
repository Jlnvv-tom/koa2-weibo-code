const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')
const { host, user, password, database } = MYSQL_CONF

const conf = {
  host: host,
  dialect: 'mysql'
}

if(isTest) {
  console.logging = () => {}
}
// 线上环境使用连接池
if(isProd) {
  conf.pool = {
    max: 5, // 连接池最大连接数
    min: 0, // 最小连接数
    idle: 10000  // 如果连接池 10秒 之内没有被使用则释放
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
