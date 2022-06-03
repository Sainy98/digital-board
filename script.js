const body = document.getElementById('body');
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 50;

let context = canvas.getContext('2d');
let ctx = "white";
context.fillStyle = ctx;
context.fillRect(0, 0, canvas.width, canvas.height);
var bt = document.getElementById("bt").innerHTML;
var div = document.getElementById("div1").innerHTML;

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;
let ct1 = "white";


function change_colour(element) {
    draw_color = element.style.background;
}



//erase
function colour() {
    draw_color = ct1;


}
//save button

function save() {
    context.fillStyle = ct1;
    context.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("div1").style.display = "";
}
function sv() {
    document.getElementById("div1").style.display = "";
    context.fillStyle = ct1;



}
function ct() {
    document.getElementById("div1").style.display = "block";

}


//clear button
function cl() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

function start(event) {
    is_drawing = 'true';
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop);
    event.preventDefault();

}
function draw(event) {
    if (is_drawing) {
        context.lineTo(event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop);
        // context.lineTo(event.clientX - body.offsetLeft,
        //     event.clientY - body.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

    }
    event.preventDefault();
}
function stop(event) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;

    }
    event.preventDefault();
}
