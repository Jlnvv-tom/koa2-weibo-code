## this is the imooc for weibo project to study

#### a koa2 project



```javaScript
变动太大的时候，提交使用
git commit -m "refactor:重构了代码"

一般提交
git commit -m "feat: 添加、新增了什么"

一般修复bug提交
git commit -m "feat: 修改了什么"

切换到master分支
git checkout master

拉
git pull origin master

合并其他分支到master分支
git merge feature-login

更新到远程
git push origin master

提交前进行eslint 检查 再package.json中添加：
 "pre-commit": [
    "lint"
  ]

  创建分支的时候
  （1）改功能的分支
  git checkout -b feature-xxx
  (2)修改修复bug的分支
  git checkout -b fix-xxx
```

### ridis 内存数据库（MySQL 是硬盘数据库）

* session 适合用redis 
* session 访问频繁 ，对性能要求高
* session 可不考虑断电丢失数据的问题(内存的硬伤)
* session 数据量不会太大(相比于MySQL中存储的数据)

### 单元测试 jest
* 单个功能或接口， 给定输入，得到输出 看输出是否符合要求
* 需要手动编写用例代码，然后统一执行
* 意义： 能一次性执行所有单元测试，短时间内验证所有功能是否正常

**使用jest**
* .test.js 文件
* 常用的断言
* 测试http 接口

### 技术方案设计

* 架构设计
如何分层、 分层程序更清晰、容易维护
* 页面(模板，路由) API设计
* 数据模型设计
各表直接 的外键关系、联动关系、数据库的三大范式
* 细节部分的设计（图片上传、@某个人）


### 功能列表
* 1、用户管理(登录注册)
* 2、用户设置(修改基本信息 、修改密码、退出登录)
* 3、创建微博，暂不显示微博列表
* 4、 个人主页、 显示个人微博列表和个人信息


### 登录注册

```
mysql 
mysql -u root -p
some code
```


### 测试代码

> index.js
```javaScript


const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [
      {
        id:1,
        name:'wjh'
      },
      {
        id:2,
        name:'zyr'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  const session = ctx.session
  if(session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum ++
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

// http://localhost:3000/wjh/bigman/6 请求格式
router.get('/wjh/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'koa2 json',
    userName,
    pageIndex
  }
})
module.exports = router

```
> users.js
```javaScript
/**
 * @description 初始的测试路由
 * @author wujihuan
 */

const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login',async function (ctx, next) {
  const { username, password } = ctx.request.body
  ctx.body = {
    username,
    password
  }
})

module.exports = router

```