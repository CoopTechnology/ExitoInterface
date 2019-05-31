function showSearchBar() {
    var topSearchBar = document.getElementById("top-search-bar");
    topSearchBar.style.display='block';
}

window.addEventListener('mouseup',function(event){
    var topSearchBar = document.getElementById('top-search-bar');
    var inputBuscadorGlobal = document.getElementById('inputBuscadorGlobal');
    var lupaInputBuscadorGlobal = document.getElementById('lupaInputBuscadorGlobal');
    var divLupaInputBuscadorGlobal = document.getElementById('divLupaInputBuscadorGlobal');
    if(event.target != divLupaInputBuscadorGlobal && event.target != lupaInputBuscadorGlobal && event.target != inputBuscadorGlobal && event.target != topSearchBar && event.target.parentNode != topSearchBar && event.target.parentNode.parentNode != topSearchBar){
        topSearchBar.style.display = 'none';
    }
});

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});