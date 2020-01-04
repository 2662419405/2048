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
    console.log(msg.red)
    // 房主操作
    if(msg.type == 1){
      Room.updateOne({title: msg.title},{
          red: JSON.stringify(msg.red),
          black: JSON.stringify(msg.black)
      },function(err,doc){
        console.log(doc)
        io.emit('send message', doc);
      });
    }if(msg.type == 2){
      // 黑方加入战斗
      Room.findOne({title:msg.title},{},function(err,doc){
        var _id = doc._id;
        Room.updateOne({_id},{
          sum: 2,
          blackName: msg.name,
        },function(){
          // 告诉对方有人加入了战斗
          io.emit('join', msg.name);
        })
      })
    }
    });
  socket.on('disconnect', () => {
    console.log('用户离开了');
  });
});
 
// 监听端口
server.listen(5000, () => {
  console.log('服务器监听5000端口');
});