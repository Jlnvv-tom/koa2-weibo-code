/**
 * @description 登录验证中间件
 * @author wujihuan
 */
 const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')

/**
 * API 登录验证
 *
 * @param {*} ctx
 * @param {*} next
 */
async function loginCheck(ctx, next) {
  // 已登录
  if(ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)

}

/**
 * 页面登录验证
 *
 * @param {Object} ctx
 * @param {function} next
 */
async function loginRedirect(ctx, next) {
  // 已登录
  if(ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  // 未登录
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))

}

module.exports = {
  loginCheck,
  loginRedirect
}
