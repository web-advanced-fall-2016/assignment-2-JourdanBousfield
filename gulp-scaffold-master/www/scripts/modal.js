


var modal = document.getElementById('myModal');

var person = document.getElementById("main");

var span = document.getElementsByClassName("close")[0];

var btn2 = document.getElementById('closeBtn');

person.onclick = function() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

}

span.onclick = function() {
    modal.style.display = "none";
     document.body.style.overflow = "";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}




window.onkeydown = function(event) {
    if ( event.keyCode == 27 ) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}
