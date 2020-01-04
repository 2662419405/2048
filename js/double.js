$(function(){
    var huan = localStorage.getItem('username')
    if(!huan){
        window.location.href = './index.html'
    }
    $('#name-strong').html(huan)
    var socket = io("ws://localhost:5000/");
    setTimeout(() => {
        // 发送双盘棋盘状况,双方分数,双方按键,type
        socket.emit('chat message', JSON.stringify({
            type: 1,
            name:　huan,
            red: window.redNameGrid,
            black: window.redNameGrid
        }));
    }, 1);
})