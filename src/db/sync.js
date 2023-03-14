/**
 * @description sequelize 同步数据库
 */

const seq =require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('连接成功auth ok')
}).catch(() => {
  console.log('连接失败auth error');
})

// 执行同步
seq.sync({ force: true}).then(() => {
  console.log('同步成功 sync ok')
  process.exit()
})
