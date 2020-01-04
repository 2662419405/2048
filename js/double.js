$(function(){
    var huan = localStorage.getItem('username')
    localStorage.removeItem('gameState')
    if(!huan){
        window.location.href = './index.html'
    }
    $('#name-strong').html(huan)
    var socket = io("ws://localhost:5000/");
    var flag = location.search.includes('black');
    socket.on('join',(data)=>{
        localStorage.setItem('red',data)
        if(!flag){
            $('#next-name').html(localStorage.getItem('red'))
        }
        // 询问是否开始游戏对战
    })
    if(flag){
        $('#next-name').html(localStorage.getItem('black'))
    }
    if(!flag){
        setTimeout(() => {
            // 发送双盘棋盘状况,双方分数,双方按键,type
            socket.emit('chat message', JSON.stringify({
                type: 1,
                name:　huan,
                red: window.redNameGrid,
                black: window.redNameGrid
            }));
        }, 1);
    }
    
    socket.on('send message',(data)=>{
        console.log(data)
    })
})