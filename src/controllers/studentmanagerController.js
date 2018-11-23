const xtpl = require("xtpl");
const path = require("path");
const databasetool = require(path.join(__dirname, "../tools/databasetool.js"));
/**
 * 最终处理，返回获取到的学生列表页面
 */
exports.getStudentListPage = async (ctx, next) => {
  const keyword = ctx.query.keyword || "";

  // 调用databasetool.findList 的方法，拿到数据，渲染列表页面，返回给浏览器
  const docs = await databasetool.findList("studentInfo", {
    name: { $regex: keyword }
  });

  xtpl.renderFile(
    path.join(__dirname, "../statics/views/list.html"),
    {
      students: docs,
      keyword,
      loginedName: ctx.session.loginedName
    },
    function(error, content) {
      ctx.body = content;
    }
  );
};

/**
 * 最终处理，返回新增学生页面
 */
exports.getAddStudentPage = (ctx, next) => {
  xtpl.renderFile(
    path.join(__dirname, "../statics/views/add.html"),
    { loginedName: ctx.session.loginedName },
    function(error, content) {
      ctx.body = content;
    }
  );
};

/**
 * 最终处理，返回新增操作之后的html(html中有一段可以执行js)
 */
exports.addStudent = async (ctx, next) => {
  const result = await databasetool.insertOne("studentInfo", ctx.req.body);
  ctx.type = "html";
  if (result == null) {
    // 新增失败
    ctx.body = `<script>alert("新增失败!");</script>`;
  } else {
    //新增成功
    ctx.body = `<script>window.location.href="/studentmanager/list"</script>`;
  }
};

/**
 * 最终处理，返回修改学生页面(带有查询出来的数据)
 */
exports.getEditStudentPage = async (ctx, next) => {
  const doc = await databasetool.findOne("studentInfo", {
    _id: databasetool.ObjectId(ctx.params.studentId)
  });

  xtpl.renderFile(
    path.join(__dirname, "../statics/views/edit.html"),
    {
      student: doc,
      loginedName: ctx.session.loginedName
    },
    function(error, content) {
      ctx.body = content;
    }
  );
};

/**
 * 最终处理，根据id修改学生信息
 */
exports.editStudent = async (ctx, next) => {
  const result = await databasetool.updateOne(
    "studentInfo",
    { _id: databasetool.ObjectId(ctx.params.studentId) },
    ctx.req.body
  );

  ctx.type = "html";
  if (result == null) {
    // 修改失败
    ctx.body = `<script>alert("修改失败!");</script>`;
  } else {
    //修改成功
    ctx.body = `<script>window.location.href="/studentmanager/list"</script>`;
  }
};

/**
 * 最终处理，根据id删除学生信息
 */
exports.deleteStudent = async (ctx, next) => {
  const result = await databasetool.deleteOne("studentInfo", {
    _id: databasetool.ObjectId(ctx.params.studentId)
  });

  ctx.type = "html";
  if (result == null) {
    // 删除失败
    ctx.body = `<script>alert("删除失败!");</script>`;
  } else {
    //删除成功
    ctx.body = `<script>window.location.href="/studentmanager/list"</script>`;
  }
};
