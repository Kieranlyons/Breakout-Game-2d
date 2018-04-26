//Set up the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Set the starting point
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius =10;

//move the ball
var dx = 2;
var dy = -2;

//Define paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//control paddle
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		leftPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}
	
//draw the ball

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	
	//If the position of ball is left or right of screen reverse direction
	if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	
	}
	
	//ball bounce off walls OR statement If the position of ball is above or below reverse direction
	if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
		dy = -dy;
	}
	
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
	
	x += dx;
	y += dy;
	
	
}




}
setInterval(draw, 10);
