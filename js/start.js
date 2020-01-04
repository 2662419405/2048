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
          if(value.length < 6){
            return '昵称至少得6个字符啊';
          }
        }
    });

    //监听提交
   form.on('submit(demo1)', function(data){
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
  });
})