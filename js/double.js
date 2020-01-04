$(function(){
    var huan = localStorage.getItem('username')
    if(!huan){
        window.location.href = './index.html'
    }
    $('#name-strong').html(huan)
})