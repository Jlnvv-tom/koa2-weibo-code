/**
 * @description user controller
 * @author wujihuan 
 */

const { getUserInfo, createUser,updateUser, deleteUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
        registerUserNameExistInfo,
        registerFaileInfo,
        loginFaileInfo,
        changeInfoFailInfo,
        deleteUserFailInfo,
        changePasswordFailInfo
      } = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用户是否存在
 * @param {*} userName
 */
async function isExist(userName) {
  //  业务逻辑处理调用service
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // 已存在
    return new SuccessModel(userInfo)
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  // 统一返回格式
}

/**
 * 注册
 * @param {*} {username 用户名, password 密码, gender 性别（1男，2女、3保密）}
 */
async function register({userName, password, gender}) {
  const userInfo = await getUserInfo(userName)
  if(userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  try {
    await createUser({userName, password:doCrypto(password),gender})
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFaileInfo)
  }
}

/**
 * 用户登录
 *
 * @param {*} ctx
 * @param {*} userName 用户名
 * @param {*} password 密码
 * @return {*} 
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if(!userInfo) {
    // 登录失败
    return new ErrorModel(loginFaileInfo)
  }
  // 登录成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

/**
 * 删除当前用户
 * @param {*} ctx
 * @param {*} userName 用户名
 */
async function deleteCurUser (userName) {
  const result = await deleteUser(userName)
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改个人信息
 * @param {*} ctx
 * @param {*} { nickName, city, picture} 昵称、城市、头像
 * @return {*} 
 */
async function changeInfo (ctx, { nickName, city, picture}) {
  const { userNmae } = ctx.session.userInfo
  if (!nickName) {
    nickName = userNmae
  }
  const result = await updateUser({
    newNickName: nickName,
    newCity: city,
    newPicture: picture
  }, { userName })

  if (result) {
    // 执行成功
    Object.assign(ctx.session.userInfo, { nickName, city, picture})
    // 返回
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param {*} { username, password, newPassword} 用户名，当前密码，新密码
 */
async function changePassword({ userName, password, newPassword}) {
  const result = await updateUser(
    { newPassword: doCrypto(newPassword)},
    { userName, password: doCrypto(password) },
  )
  if (result) {
    // 成功
    return new SuccessModel()
  }
  // 失败
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
 async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}
