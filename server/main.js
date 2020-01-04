var Koa = require('koa');
var app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const Route = require('./router')

// 引入路由
app.use(Route.routes());   /*启动路由*/
app.use(Route.allowedMethods());
 
// socket连接
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: '+msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('用户离开了');
  });
});
 
// 监听端口
server.listen(5000, () => {
  console.log('listening on *:5000');
});