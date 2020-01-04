//自定义验证规则
layui.use(['form', 'laydate'], function(){
    var form = layui.form
    ,layer = layui.layer

    form.verify({
        title: function(value){
          if(value.length < 3){
            return '昵称至少得3个字符啊';
          }
        }
    });

    //监听提交
   form.on('submit(demo1)', function(data){
    var index = layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    },function(){
      // var socket = io("ws://localhost:5000/");
      // socket.emit('chat message', JSON.stringify(data.field));
      axios.get('http://localhost:5000/room',{params:{redName:data.field.title,title:data.field.username}}).then((res)=>{
        if(res.data.code == 1){
          layer.alert('服务器创建成功',function(){
            window.localStorage.setItem('username',data.field.title)
            window.parent.location.href = './double.html?red='+data.field.title+"&title="+data.field.username
          })
        }
        if(res.data.code == 2){
          layer.alert('发生错误')
        }
      })
      layer.close(index);
    })
    return false;
  });
})