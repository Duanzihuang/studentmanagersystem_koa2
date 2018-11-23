var Router = require('koa-router')
const path = require('path')
const studentManagerRouter = new Router();

// 导入studentManagerController
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentmanagerController.js"))

// 处理具体请求
// 获取学生列表页面
studentManagerRouter.get('/studentmanager/list',studentManagerCTRL.getStudentListPage)

// 获取新增页面
studentManagerRouter.get('/studentmanager/add',studentManagerCTRL.getAddStudentPage)

// 完成新增操作
studentManagerRouter.post('/studentmanager/add',studentManagerCTRL.addStudent)

// 获取修改页面(动态路径参数)
studentManagerRouter.get('/studentmanager/edit/:studentId',studentManagerCTRL.getEditStudentPage)

// 完成修改操作(动态路径参数)
studentManagerRouter.post('/studentmanager/edit/:studentId',studentManagerCTRL.editStudent)

studentManagerRouter.get('/studentmanager/delete/:studentId',studentManagerCTRL.deleteStudent)

module.exports = studentManagerRouter