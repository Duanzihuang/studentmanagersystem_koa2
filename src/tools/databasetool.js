const mongoose = require("mongoose");

// 连接到数据库
mongoose.connect(
  "mongodb://localhost/szhmqd21",
  { useNewUrlParser: true }
);

/**
 * 连接成功
 */
mongoose.connection.on("connected", function() {
  console.log("Mongoose connection success ");
});

// 获取Schema
const Schema = mongoose.Schema;

// 创建相应的Schema
const UserSchema = new Schema(
  {
    username: String,
    password: String
  },
  { collection: "accountInfo", versionKey: false }
);

const StudentSchema = new Schema(
  {
    name: String,
    age: String,
    sex: String,
    phone: String,
    address: String,
    introduction: String
  },
  { collection: "studentInfo", versionKey: false }
);

// 创建相应的对象
const User = mongoose.model("accountInfo", UserSchema);
const Student = mongoose.model("studentInfo", StudentSchema);

// 定义常量
const ACCOUNTINFO = "accountInfo";
const STUDENTINFO = "studentInfo";

// 导出ObjectId
exports.ObjectId = mongoose.Types.ObjectId;

/**
 * 导出查询一个的方法
 * collectionName 集合名称
 * params 参数
 */
exports.findOne = (collectionName, params) => {
  return new Promise((resolve, reject) => {
    switch (collectionName) {
      case ACCOUNTINFO:
        User.findOne(params, (err, doc) => {
          if (err) {
            reject(err);
          }
          resolve(doc);
        });
        break;
      default:
        break;
    }
  });
};

/**
 * 导出插入一个的方法
 * collectionName 集合名称
 * params 参数
 */
exports.insertOne = (collectionName, params) => {
  return new Promise((resolve, reject) => {
    switch (collectionName) {
      case ACCOUNTINFO:
        // 解构赋值
        const { username, password } = params;
        // 创建具体的模型
        const user = new User({
          username,
          password
        });
        user.save((err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
        break;
      case STUDENTINFO:
        const student = new Student(params);
        student.save((err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
        break;
      default:
        break;
    }
  });
};

/**
 * 导出查询列表的方法
 * collectionName 集合名称
 * condition 条件
 */
exports.findList = (collectionName, condition) => {
  return new Promise((resolve, reject) => {
    switch (collectionName) {
      case STUDENTINFO:
        Student.find(condition, (err, docs) => {
          if (err) {
            reject(err);
          }

          resolve(docs);
        });
        break;

      default:
        break;
    }
  });
};

/**
 * 导出一个方法，根据id，返回数据
 */
exports.findById = (collectionName, id) => {
  return new Promise((resolve, reject) => {
    switch (collectionName) {
      case STUDENTINFO:
        Student.findById(id, (err, doc) => {
          if (err) {
            reject(err);
          }

          resolve(doc);
        });
        break;

      default:
        break;
    }
  });
};

/**
 * 导出根据条件修改一个的方法
 * collectionName 集合名称
 * condition 条件
 * params 参数
 */
exports.updateOne = (collectionName, condition, params) => {
  return new Promise((resolve, reject) => {
    switch (collectionName) {
      case STUDENTINFO:
        Student.updateOne(condition, params, (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
        break;

      default:
        break;
    }
  });
};

/**
 * 导出删除一个的方法
 * collectionName 集合名称
 * condition 条件
 */
exports.deleteOne = (collectionName, condition) => {
  return new Promise((resolve, reject) => {
    switch (collectionName) {
      case STUDENTINFO:
        Student.deleteOne(condition, (err, result) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        });
        break;

      default:
        break;
    }
  });
};
