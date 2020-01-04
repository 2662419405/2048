const Router = require('koa-router')();
const model = require('./model')
const Room = model.getNames('room')

Router.get('/room', async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin', '*');
    const { redName, title } = ctx.request.query;
    const time = new Date().getTime();
    const userModel = new Room({redName,title,time})
    userModel.save(function(e,d){
        if(e){
            ctx.body = JSON.stringify({code:'2',message:'服务器发生了错误'})
        }
    })
    ctx.body = JSON.stringify({code:'1',message:'消息'})
} )

module.exports = Router;