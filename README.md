# blogapi
express restful api

### 所用包
1. nodemailer+qq mail 发送激活邮件
2. passport-local 本地登陆
3. express-validator 用户注册信息验证
4. jsonwebtoken 用户权限验证
5. bcrypt 生成token和密码加密（密码hash未实现）
6. cors 实现跨域
7. standard 代码风格检验

### 问题
1. 用闭包解决文件中this上下文指向的问题
2. passport-local 400 bad request，与登陆的字段相关
3. bcrypt的第二个参数好像是固定的


