/**
 * @description  redis 的操作方法 set get
 * @author wujihuan
 */

const redis = require("redis");
const { REDIS_CONF } = require("../conf/db")

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", (err) => {
  console.error("redis error", err);
});

/**
 * redis set
 * @param {*} key 健
 * @param {*} val 值
 * @param {number} [timeout=60*60] 过期时间 单位s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === "object") {
    redisClient.set(key, val, timeout);
    redisClient.expire(key, timeout);
  }
}

/**
 * redis get
 * @param {*} val
 * @return {*} 
 */
function get(val) {
  const promise = new Promise((resolve, reject) => {
    if (err) {
      reject(err)
      return
    }
    if (val == null) {
      resolve(null)
      return
    }
    try {
      resolve(JSON.parse(val))
    } catch (ex) {
      resolve(val)
    }
  })
  return promise
}

module.exports = {
  set,
  get,
}
