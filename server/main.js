var Koa = require('koa');
var app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const Route = require('./router')
const model = require('./model')
const Room = model.getNames('room')
const cors = require('koa2-cors')
app.use(cors())

// 引入路由
app.use(Route.routes());   /*启动路由*/
app.use(Route.allowedMethods());
 
// socket连接
io.on('connection', (socket) => {
  socket.on('chat message',async (msg) => {
    msg = JSON.parse(msg)
    // 判断是谁发来的数据
    console.log(msg.red)
    if(msg.type == 1){
      Room.update({"redName": msg.name},{
          red: JSON.stringify(msg.red),
          black: JSON.stringify(msg.black)
      },function(err,doc){
        console.log(doc)
        io.emit('send message', doc);
      });
    }else{
      Room.update({blackName: msg.name},{
          red: msg.red,
          black: msg.black,
      },function(err,doc){
        console.log(doc)
        io.emit('send message', doc);
      });
    }
    });
  socket.on('disconnect', () => {
    console.log('用户离开了');
  });
});
 
// 监听端口
server.listen(5000, () => {
  console.log('listening on *:5000');
});