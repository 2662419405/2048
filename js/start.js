$('#username-sh').focus(function(){
    layui.use('layer', function(){
        layer.tips('请输入昵称', '#username-sh'); 
    });
})

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
      localStorage.setItem('username',data.field.title)
      layer.close(index);
    })
    return false;
  });
})

$(function(){
  $('#username-sh').attr('value',localStorage.getItem('username'))
  axios.get('http://localhost:5000/list').then((res)=>{
    var data = res.data.results;
    if(data.length == 0 ){
      $('#room-body').html('暂无房间,请创建房间')
    }else{
      for(var i=0;i<data.length;i++){
        var str = `<div><span>`+"房间名称:&nbsp;"+"<span class='room-class'>"+data[i].title.substr(0,8)+"</span>"+
        "房主:&nbsp;"+"<span class='room-content'>"+data[i].redName.substr(0,8)+"</span>"+
        "<button class='layui-btn layui-btn-warm'>加入房间</button>"+
        `</span></div>`;
        $('#room-body').append($(str))
      }
    }
  })
  $('#room-body').on('click','button',function(e){
    e.preventDefault()
    var len = $('#username-sh').attr('value')
    if(len.length<=2){
      layer.msg('请输入昵称');
      $('#username-sh').focus()
      return false;
    }
    axios.get('http://localhost:5000/list').then((res)=>{
      var data = res.data.results;
      var socket = io("ws://localhost:5000/");
      var oDom = data[$(this).parent().parent().index()];
      var title = oDom.title
      socket.emit('chat message', JSON.stringify({
        type: 2,
        name: len,
        title: oDom.title
      }));
      localStorage.setItem('red',oDom.redName)
      localStorage.setItem('username',len)
      localStorage.setItem('gameState', JSON.parse(oDom.red))
      window.parent.location.href = './double.html?black='+len+"&title="+title
    })
  })
})