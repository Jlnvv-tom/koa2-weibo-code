/**
 * @description 微博缓存
 * @author wujihuan 
 */

const {get, set } = require('./_redis')
const {getBlogListByUser } = require('../services/blog')
// redis key 前缀

const KEY_PERFIC = 'weibo:square:'

/**
 * 获取广场列表的缓存
 *
 * @param {*} pageIndex
 * @param {*} pageSize
 */
async function getSquareCacheList (pageIndex, pageSize) {
  const key = '${KEY_PERFIC}${pageIndex}_${pageSize}'
  
  // 尝试获取缓存
  const cacheResult = await get(key)
  if (cacheResult !== null) {
    // 获取缓存成功
    return cacheResult
  }

  // 没有缓存
  const result = await getBlogListByUser({ pageIndex, pageSize})

  // 设置缓存， 过期事件 1min
  set(key, result, 60)
}

module.exports = {
  getSquareCacheList
}
