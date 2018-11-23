//1、导入koa-router
var Router = require('koa-router')
const path = require('path')

//2、创建路由对象
const accountRouter = new Router();

//导入控制器
const accountCTRL = require(path.join(__dirname,"../controllers/accountController.js"))

//3、处理具体的请求
// 获取登录页面的请求
accountRouter.get('/account/login',accountCTRL.getLoginPage)

// 获取注册页面的请求
accountRouter.get('/account/register',accountCTRL.getRegisterPage)

// 处理注册请求
accountRouter.post('/account/register',accountCTRL.register)

// 获取图片验证码
accountRouter.get('/account/vcode',accountCTRL.getVcodeImage)

// 处理登录
accountRouter.post('/account/login',accountCTRL.login)

// 处理登出
accountRouter.get('/account/logout',accountCTRL.logout)

//4、导出
module.exports = accountRouter