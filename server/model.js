const mongoose = require('mongoose')

//数据库的地址
const DB_URL = "mongodb://localhost:27017/2048"
mongoose.connect(DB_URL)

const models = {
    room: {
        // 房主棋盘
        'red': {type:String, require:true},
        // 黑色棋盘
        'black': {type:String, require:true},
        // 房主名字
        'redName':{type:String },
        // 黑方名字
        'blackName':{ type:String },
        // 房间名字
        'title':{ type:String },
        // 房间人数
        'sum':{ type:Number},
        // 房间创建时间
        'time':{ type:String },
        // 结束标志
        'flag':{ type:Boolean },
        // 我方此次按键
        'redType':{ type:String },
        // 对方此次按键
        'blackType':{ type:String },
    }
}

for( let m in models ){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getNames:function(name){
        return mongoose.model(name)
    }
}