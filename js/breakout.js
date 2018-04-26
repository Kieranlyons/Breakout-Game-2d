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
			bricks[c][r] = { x: 0, y: 0, status: 1 };
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
	
	//Keeping Score
	var score = 0;
	
	//added Game Sounds
	var WINNING_SOUND = new Audio('sounds/woohoo.wav');
	var SCORE_SOUND = new Audio('sounds/success.wav');
	var GAMEOVER_SOUND = new Audio('sounds/gameover.wav');
	var BACKGROUND_SOUND = new Audio('sounds/erokia.wav');
	var PADDLE_SOUND =	new Audio('sounds/burp.wav');
	
	//lives
	var lives = 3;

	
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
		if (bricks[c][r].status == 1 ) {
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
}
	
	
	
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
		drawBall();
        drawPaddle();
		collisionDetection();
		drawScore();
		drawLives();
		
	BACKGROUND_SOUND.Loop = true;
	BACKGROUND_SOUND.play();
		
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
			PADDLE_SOUND.play();
			dy = -dy;
			
		}
		else 
			{
				GAMEOVER_SOUND.play();
				lives--;
				if(!lives) {
				alert("GAME OVER");
				document.location.reload();
				}
				else {
					x = canvas.width/2;
					y = canvas.height-30;
					dx = 2;
					dy = -2;
					paddleX = (canvas.width-paddleWidth)/2;
}
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

	function collisionDetection(){
		for (c=0; c<brickColumnCount; c++) {
			for (r=0; r<brickRowCount; r++){
				var b = bricks[c][r];
				if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy= -dy;
					b.status = 0;
					// have to change score back from increments of 10, game ending early ,3 bricks = 30 bricks = congratulations
					score++;
					//Success + sound
					SCORE_SOUND.play();
					if (score == brickRowCount*brickColumnCount) {
						WINNING_SOUND.play();
						alert("YOU WIN, CONGRATULATIONS!!!");
						document.location.reload();
					}
					}
				}
			}
		}
	}
	
	function drawScore(){
		ctx.font =  "16px Comic Sans";
		ctx.fillStyle = "Green";
		ctx.fillText("Score: "+score, 6, 16);
		document.getElementById("gamescore").innerHTML = "score:" + score;
	}
	
	function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);

}
 setInterval(draw, 10);