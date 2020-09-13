node思维导图：

地址：https://www.processon.com/view/link/5d4b852ee4b07c4cf3069fec#outline



刻意练习



定义明确目标



小而明确



smart原则



集中注意力



微信不开PC端



邮件定时收取



番茄工作法



反馈



分步调试



通过log去debug



脱离舒适区



不看笔记



只看视频



公众号开发



环境



内网穿透



ngrok



服务器端



消息接口



认证



sha1签名



服务器API接口



服务器API



token认证



获取



全局票据



mongodb



网页端



网页授权



OAuth2.0



jwt



JSSDK



Node



预习课



环境



运行



debug



nodemon



自动重启工具



ES6 babel



常用模块



核心



buffer



用于处理二进制数据流



alloc



from



write



contact



toString



module



模块操作



require



module.exports



process



不用require



内置



os



freemem



fs



path



http



event



不用install 需要require



第三方模块



流程控制



async await



promise



generater



callback



基础



I/O处理



异步I/O



promisify



buffer



stream



http



手写一个cli



模板下载



约定路由



commander



发布



下载依赖



启动工程



Koa



特点



Express下一代web框架



v1 



ES6 gennerator



v2



ES7



async/await



轻量无捆绑



中间件架构



洋葱圈结构



上下文



koa简单应用



静态服务



router



logger



原理



context上下文



ES6 getter setter



Object.create



ES6语法



对象继承



中间件机制



函数式编程compose



异步compose



JS中间件对比学习



express



koa



redux



示例



https://github.com/nanjixiong218/analys-middlewares/tree/master/src



责任链模式



重要中间件原理



static



router



原生http的不足



令人困惑的request和response



res.end



流是个什么东西



res.writeHead



对描述复杂业务逻辑



流程描述



- 切面描述 AOP



语言级



框架级



网络编程



套接字编程Socket



TCP



建立



三次握手



第一次握手



建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。



第二次握手



服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；



第三次握手



客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。



断开



四次挥手



1）客户端进程发出连接释放报文，并且停止发送数据。释放数据报文首部，FIN=1，其序列号为seq=u（等于前面已经传送过来的数据的最后一个字节的序号加1），此时，客户端进入FIN-WAIT-1（终止等待1）状态。 TCP规定，FIN报文段即使不携带数据，也要消耗一个序号。 2）服务器收到连接释放报文，发出确认报文，ACK=1，ack=u+1，并且带上自己的序列号seq=v，此时，服务端就进入了CLOSE-WAIT（关闭等待）状态。TCP服务器通知高层的应用进程，客户端向服务器的方向就释放了，这时候处于半关闭状态，即客户端已经没有数据要发送了，但是服务器若发送数据，客户端依然要接受。这个状态还要持续一段时间，也就是整个CLOSE-WAIT状态持续的时间。
3）客户端收到服务器的确认请求后，此时，客户端就进入FIN-WAIT-2（终止等待2）状态，等待服务器发送连接释放报文（在这之前还需要接受服务器发送的最后的数据）。
4）服务器将最后的数据发送完毕后，就向客户端发送连接释放报文，FIN=1，ack=u+1，由于在半关闭状态，服务器很可能又发送了一些数据，假定此时的序列号为seq=w，此时，服务器就进入了LAST-ACK（最后确认）状态，等待客户端的确认。
5）客户端收到服务器的连接释放报文后，必须发出确认，ACK=1，ack=w+1，而自己的序列号是seq=u+1，此时，客户端就进入了TIME-WAIT（时间等待）状态。注意此时TCP连接还没有释放，必须经过2∗∗MSL（最长报文段寿命）的时间后，当客户端撤销相应的TCB后，才进入CLOSED状态。
6）服务器只要收到了客户端发出的确认，立即进入CLOSED状态。同样，撤销TCB后，就结束了这次的TCP连接。可以看到，服务器结束TCP连接的时间要比客户端早一些。 



UDP



无连接的传输层协议



针对TCP/IP协议的传输层



http



http协议



跨域



CORS原理



jsonp



js



Nginx 与 webpack 



代理服务器 与 转发 + 跨域



http爬虫



埋点应用



img.href



bodyparser



上传原理



onprogress实现



应用



webuploader elemnet



流



trunk upload 分包上传



下载



下载报头解决打开方式



应用



websocket



实时通讯IM



socket.io



http2



多路复用



https://http2.akamai.com/demo



首部压缩



服务器推送



简单部署策略 前后端分离



nginx + node



4/5 持久化



fs



mysql



native



squelize



关联



1 : 1



belongsTo + hasOne



1 : N



belongsTo + hasMany



N : N



belongsToMany



trough: 中间表



命名



蛇形命名



underscored: true



驼峰命名



默认



批量处理 + ETL



bulkCreate(record[,options])



ETL



SQL



INSERT INTO SELECT



权限设计数据库结构



jeecg



连接池与并发处理



连接池作用



省略了创建连接和销毁连接的过程。这样性能上得到了提高



不使用



占用内存资源



服务器性能降低



代码对比



连接数



性能参数



事务处理和AOP事务管理



sequelize事务处理



https://segmentfault.com/a/1190000011583945#item-1-3



mysql innodb事务处理



中间件



https://www.npmjs.com/package/node-mysql-transaction



https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/transactions.md



非常详细的文章



https://www.imweb.io/topic/56628e8bd91952db73b41f4f



实体关系模型实战



mongodb



native



Mongoose



零编码方式



EventEmit



异步编程的四样解法



http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html



回调



发布订阅



事件监听



Promise 承诺执行



rxjs



鉴权



cookie-session模式



session源码实现



koa cookie-session模式



redis全局session



token jwt模式



jwt原理



koa-jwt



优势



密码学方式



服务器无状态化



灵活



不依赖浏览器



cookie



跨域



扩展知识



Oauth2模式



github



SSO单点登录



eggjs 多层层原理



Eggs



三层结构



MVC



约定优于配置



convention over configuration



软件设计范式



减少软件开发人员需做决定的数量



简单不是灵活



实现一个MVC框架



MVC框架解释



eggjs更佳实践



api接口文档



egg-swagger-doc-feat



restful服务



get



post



delete



put



表单校验



egg-validate



鉴权



jwt



egg-bcrypt



加密



egg-jwt



jwt token



生命周期函数



初始化数据



上传



鉴权



进度条



持久化



egg-mongoose



TypeScript与装饰器



Typescript



类Classes



接口 Interfaces



模块Modules



类型注解 Type annotations 装饰器



装饰器



仅提供定义劫持，能够对类及其方法、方法入参、属性的定义并没有提供任何附加元数据的功能。



注解



供附加元数据支持，并不能实现任何操作。需要另外的 Scanner 根据元数据执行相应操作



编译时类型检查 Compile time type checking



箭头函数 Arrow



Lambda 表达式



装饰器



类装饰



方法装饰



AOP功能



https://www.cnblogs.com/winfred/p/8216650.html



架构



router



validattion



注册中间件



AOP



models



张紫月同学老大的作品



https://github.com/lichangwei/koa-router-decorators



驱动化模块架构



nodejs + ts总结



https://www.cnblogs.com/xuanmanstein/p/9887527.html



装饰器模式与装饰器的联系



https://www.jianshu.com/p/398f0e8f2699



10_部署_Docker_自动化部署



 常规



阿里云ECS



ssh 公私钥



sftp上传 



webstore同步插件



nginx



静态服务



反向代理



gzip



负载均衡



域名解析



nodejs



mongoodb



pm2



cluster模块



docker



docker基础



基本操作



定制镜像



docker-compose



部署一个前后端分离项目



github webhooks 自动部署



http缓存



网络安全



常见Web攻击



XSS



定义



跨站脚本攻击



跨站脚本攻击，因为缩写和 CSS重叠，所以只能叫 XSS。跨站脚本攻击是指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的非本站点HTML标签或JavaScript进行的一种攻击。



危害



利用虚假输入表单骗取用户个人信息



利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。



显示伪造的文章或图片。



防御



HEAEDR



X-XSS-Protection



CSP



Content-Security-Policy: default-src 'self'



只允许加载本站资源



Content-Security-Policy: img-src https://*



只允许加载 HTTPS 协议图片



Content-Security-Policy: child-src 'none'



不允许加载任何来源框架



转义字符



黑名单



白名单



CSRF



定义



Cross Site Request Forgery



即跨站请求伪造



一种常见的Web攻击，它利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作。



危害



利用用户登录态在用户不知情的情况下 完成业务请求



防御



禁止第三方网站带Cookie



Refer Check



验证码



Click Injecting



定义



点击劫持



点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。



危害



利用用户登录态在用户不知情的情况下 完成业务请求



防御



JS方式 iframe禁止



X-FRAME-OPTIONS



SQL注入



定义



把SQL命令插入到Web表单提交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令



防御



参数化的语句



数据库权限限制



SQL特殊字符检测



请求劫持



定义



DNS服务器(DNS解析各个步骤)被篡改，修改了域名解析的结果，使得访问到的不是预期的ip



防御



HTTPS



DDOS



定义



distributed denial of service



分布式访问拒绝攻击



防御



备份网站



带宽扩容



靠谱运营商



高防IP



请求劫持



防御手段



密码安全



密码学



对称



DES



非对称



RSA



摘要



SHA1



MD5



传输安全



Https



身份验证



加密传输



NodeJS安全框架



helmet



Strict-Transport-Security



强制使用安全连接



X-Frame-Options



点击劫持保护



X-XSS-Protection



跨站脚本攻击



X-Content-Type-Options



防止浏览器使用MIME-sniffing



Content-Security-Policy



防止受到跨站脚本攻击以及其他跨站注入攻击



CSP策略