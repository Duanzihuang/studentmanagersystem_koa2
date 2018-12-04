//1、导入koa
const Koa = require('koa');
const path = require('path')
const koaBody = require('koa-body');
const session = require('koa-session')
const static = require('koa-static')   //静态资源服务插件
const jwt = require('jsonwebtoken');
const config = require('config')
const jwtConfig = config.get('jwt_config')
const fs = require('fs')
const cert = fs.readFileSync(path.join(__dirname,"pem/public.pem"))
// const passport = require('passport')

//2、创建应用
const app = new Koa();

// 配置静态资源
app.use(static(
    path.join( __dirname, './statics')
))

app.use(koaBody({
    patchNode:true
}))

// Use the session middleware
app.keys = ['some secret hurr'];
const CONFIG = {
    // key: 'itcast',
    maxAge: 120000
}

app.use(session(CONFIG, app));

// app.use(cookie())

// 权限控制
/**
app.use(async (ctx, next) => {
  if(ctx.req.url.includes('account')){
    await next();
  }else{
    if(ctx.session.loginedName!=null){
      await next();
    }else{
      ctx.body='<script>alert("您还没有登录，请先登录!");location.href="/account/login"</script>'
    }
  }
});
*/
app.use(async (ctx,next)=>{
  if(ctx.req.url.includes('account')){
    await next();
  }else{
    const token = ctx.cookies.get('Authorization')
    
    if(token){
      try {
        // 获取配置
        const jwtConfig = config.get('jwt_config')

        var decoded = jwt.verify(token, jwtConfig.secretOrPrivateKey)
        // var decoded = jwt.verify(token, cert,{ algorithms: ['RS256'] })
        // console.log(decoded)

        // 设置给请求
        ctx.req.loginedName = decoded.username
        
        // 可以访问受限资源了
        await next()
      } catch(err) {
        console.log(err)
        // err
        ctx.body='<script>alert("登录状态已过期，请重新登录!");location.href="/account/login"</script>'
      }
    }else{
      ctx.body='<script>alert("您还没有登录，请先登录!");location.href="/account/login"</script>'
    }
  }
})

//3、集成路由
const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"))
const studentManagerRouter = require(path.join(__dirname,"./routers/studentmanagerRouter.js"))

app.use(accountRouter.routes());
// app.use(accountRouter.allowedMethods());

app.use(studentManagerRouter.routes());
// app.use(studentManagerRouter.allowedMethods());

//4、开启Web服务
app.listen(3000,err=>{
    if(err){
        console.log(err)
    }

    console.log("start OK")
})
