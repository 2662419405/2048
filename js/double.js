$(function(){
    var huan = localStorage.getItem('username')
    if(!huan){
        window.location.href = './index.html'
    }
    $('#name-strong').html(huan)
    var socket = io("ws://localhost:5000/");
    socket.emit('chat message', 1);
})