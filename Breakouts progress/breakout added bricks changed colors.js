//set variables
//set canvas
var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
	
	//set starting point
    var ballRadius = 10;
    var x = canvas.width/2;
    var y = canvas.height-30;
	
	//move the ball
    var dx = 2;
    var dy = -2;
	
	//bricks
	var brickRowCount = 5;
	var brickColumnCount = 6;
	var brickWidth = 62;
	var brickHeight = 15;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	
	//Hold bricks in array or rows and columns
	var bricks = [];
	for(c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0 };
		}
}
	
	//definepaddle
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
	
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);	
	
	//control paddle
    var rightPressed = false;
    var leftPressed = false;
	

	
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
	//draw the ball
	
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }
	
	//draw the paddle 
	
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
	//draw the bricks
	
	function drawBricks() {
		for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "Red";
            ctx.fill();
            ctx.closePath();
        }
    }
}
	
	
	
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
		drawBall();
        drawPaddle();
		
		// ball bounces position left - right
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
		//ball bounces top / game over
       if(y + dy < ballRadius) {
		dy = -dy;
		
		} else if(y + dy > canvas.height-ballRadius) {
		//check the ball is hitting paddle
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		}
		else {alert("GAME OVER");
		document.location.reload();
			
		
		}
		
		
		
}	
           
        
		// changing value after += will change the speed of travel of the paddle.
		
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 8;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 8;
        }
        x += dx;
        y += dy;
		
}	   
 setInterval(draw, 10);