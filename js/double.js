$(function(){
    var huan = localStorage.getItem('username')
    if(!huan){
        window.location.href = './index.html'
    }
    var socket = io("ws://localhost:5000/");
    var flag = location.search.includes('black');
    socket.on('join',(data)=>{
        localStorage.setItem('black',data)
        if(!flag){
            $('#next-name').html(localStorage.getItem('black'))
        }
        // 询问是否开始游戏对战
    })
    $('#name-strong').html(huan)
    if(flag){
        $('#next-name').html(localStorage.getItem('red'))
        $('#fangzhu').html('你的名字是')
    }
    if(!flag){
        // localStorage.removeItem('gameState')
        $('#next-name').html(localStorage.getItem('black'))
        
        setTimeout(() => {
            console.log(window.redNameGrid)
            // 发送双盘棋盘状况,双方分数,双方按键,type
            title = localStorage.getItem('title')
            socket.emit('chat message', JSON.stringify({
                type: 1,
                name:　huan,
                title,
                red: localStorage.getItem('gameState'),
                black: localStorage.getItem('gameState')
            }));
        }, 1);
    }
    
    socket.on('send message',(data)=>{
        console.log(data)
    })
})