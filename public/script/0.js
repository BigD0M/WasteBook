window.onload = function () {
    // First we get a hold of the 3 sections
    var divs = document.getElementsByClassName("col-sm-4");

    var theMiddleDivHasBeenClicked = false;
    var sectionOneOrThreeClicked = "one";

    if (theMiddleDivHasBeenClicked == false) {
        // Once the user clicks the first sections ("add waste")...
        divs[4].addEventListener("click", function () {
            theMiddleDivHasBeenClicked = true;
            var counter = 5; // The amount of seconds the user has to enact the game
            var numberOfClicks = 1; // To keep track of the amount of times the user clicks

            // Every second...
            var countDown = setInterval(function () {

                // The counter goes down by 1 (so every 1000ms, the counter goes down symbolising 1 second)
                counter--;

                // As long as the counter hasn't hit 0...
                if (counter > 0) {

                    // We'll increment the amount of clicks by 1 if the user clicks on the 3rd section
                    divs[5].addEventListener("click", function () {
                        if (sectionOneOrThreeClicked == "one") {
                            numberOfClicks++;
                            sectionOneOrThreeClicked = "three";
                        }
                    });

                    // We'll increment the amount of clicks by 1 if the user clicks on the 1st section
                    divs[0].addEventListener("click", function () {
                        if (sectionOneOrThreeClicked == "three") {
                            numberOfClicks++;
                            sectionOneOrThreeClicked = "one";
                        }
                    });
                }

                // If we've hit the 0 second mark and the user has clicked either sections a certain amount of times...
                if ((numberOfClicks >= 5) && (counter == 0)) {
                    clearInterval(countDown);

                    // We get a hold of the section holding the 3 main functions
                    var segment = document.getElementsByClassName("row")[0];

                    // We replace all the code in there with a simple canvas element
                    segment.innerHTML = "<canvas id=\"myCanvas\"></canvas>";

                    // The background color of the section is set
                    segment.style.backgroundColor = "#FF8800";

                    // The way the section displays is set
                    segment.style.display = "block";

                    // We reset the margin of the sections to be safe
                    segment.style.margin = "0 auto";

                    // We reset the padding of the sections to be safe
                    segment.style.padding = "0";

                    // We get a hold of the canvas
                    var canvas = document.getElementById("myCanvas");

                    // Have the program understand that we're going to be working under 2-dimensional rules
                    var ctx = canvas.getContext("2d");

                    // Set the width of the canvas so that the ball doesn't go off screen
                    canvas.width = (document.body.clientWidth - 30) * 0.98;

                    // Set the height of the canvas so that the ball doesn't go off screen
                    canvas.height = (document.body.clientHeight - 30) - 100;

                    // Set the size of the ball
                    var ballRadius = 10;

                    var x = canvas.width / 2;
                    var y = canvas.height - 30;
                    var dx = 2;
                    var dy = -2;
                    var originalDX = 2;
                    var originalDY = -2;
                    var level = 1;

                    // Set the height of the paddle depending on the screen's height
                    var paddleHeight = document.body.clientHeight * 0.02;

                    // Set the width of the paddle depending on the screen's width
                    var paddleWidth = document.body.clientWidth * 0.1;

                    // If the paddle is too skinny...
                    if (paddleWidth < 100) {

                        // Set it to the minimum width
                        paddleWidth = 100;
                    }

                    // Find the centre of the screen to place the paddle
                    var paddleX = (canvas.width - paddleWidth) / 2;

                    // Set the variables to keep track of if the user pressed the left/right key
                    var rightPressed = false;
                    var leftPressed = false;

                    // Set the amount of blocks we'll place in each row. I did this by dividing the window's width (I got 90 through trial and error to see what works) and then removed the numbers after the decimal place.
                    var brickRowCount = ((window.innerWidth - 30) / 90) - (((window.innerWidth - 30) / 90) % 1);

                    // Set the amount of blocks we'll place in each row (60 was also gotten from trial and error)
                    var brickColumnCount = (window.innerHeight - 30) / 60;
                    // Set the width of the blocks that'll be getting hit
                    var brickWidth = 75;

                    // Set the height of the blocks that'll be getting hit
                    var brickHeight = 20;

                    // Set the space between the blocks
                    var brickPadding = 10;

                    // Distance between the blocks from the top and left side of the canvas
                    var brickOffsetTop = 30;
                    var brickOffsetLeft = 30;

                    // Set the score
                    var score = 0;

                    // Set the number of lives
                    var lives = 3;

                    // Make the array that'll host all the blocks
                    var bricks = [];

                    // Variables for the FOR loops
                    var column = 0;
                    var row = 0;

                    // Each block in the array has 3 quantities
                    for (column = 0; column < brickColumnCount; column++) {
                        bricks[column] = [];
                        for (row = 0; row < brickRowCount; row++) {
                            bricks[column][row] = {
                                x: 0, // Horizontal position
                                y: 0, // Vertical position
                                status: 1 // Whether or not it's still in the game
                            };
                        }
                    }

                    // The types of controls we're accepting
                    document.addEventListener("keydown", keyDownHandler, false);
                    document.addEventListener("keyup", keyUpHandler, false);
                    document.addEventListener("mousemove", mouseMoveHandler, false);
                    $(document).on('touchstart', '#myCanvas', function (e) {
                        paddleX = e.originalEvent.touches[0].pageX;
                    });

                    // When the user presses the left/right key down
                    function keyDownHandler(e) {

                        // We make a memo of which key was pressed
                        if (e.keyCode == 39) {
                            rightPressed = true;
                        } else if (e.keyCode == 37) {
                            leftPressed = true;
                        }
                    }

                    // When the user released the left/right key back up
                    function keyUpHandler(e) {

                        // We make a memo of which key was released (not pressed anymore)
                        if (e.keyCode == 39) {
                            rightPressed = false;
                        } else if (e.keyCode == 37) {
                            leftPressed = false;
                        }
                    }

                    // When the user uses their mouse
                    function mouseMoveHandler(e) {

                        // We make sure the paddle follows along and make up for the offset from the left side of the canvas
                        var relativeX = e.clientX - canvas.offsetLeft;

                        // As long as the cursor is within the canvas, the paddle will move with it
                        if (relativeX > 0 && relativeX < canvas.width) {
                            paddleX = relativeX - paddleWidth / 2;
                        }
                    }

                    // When the ball hits a block
                    function collisionDetection() {

                        // We go through every block...
                        for (column = 0; column < brickColumnCount; column++) {
                            for (row = 0; row < brickRowCount; row++) {
                                var b = bricks[column][row];

                                // If the block is still in the game...
                                if (b.status == 1) {

                                    // And the position of the block matches the ball...
                                    if ((x > b.x) && (x < (b.x + brickWidth)) && (y > b.y) && (y < (b.y + brickHeight))) {

                                        // We bounce the ball back
                                        dy = -dy;

                                        // Make note that the block is no longer in the game
                                        b.status = 0;

                                        // Increase the user's score by 10
                                        score += 10;

                                        // If the score matches the number of blocks we should have multipled by 100...
                                        if (score == ((level * ((brickRowCount - (brickRowCount % 1)) * (brickColumnCount - (brickColumnCount % 1) + 1))) * 10)) {

                                            if (dx < 0) {
                                                dx *= -1;
                                            }

                                            if (dy > 0) {
                                                dy *= -1;
                                            }

                                            dx += 1;
                                            dy -= 1;
                                            originalDX += 1;
                                            originalDY -= 1;
                                            for (column = 0; column < brickColumnCount; column++) {
                                                for (row = 0; row < brickRowCount; row++) {
                                                    bricks[column][row].status = 1;
                                                }
                                            }
                                            x = canvas.width / 2;
                                            y = canvas.height - 30;
                                            level++;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // To draw the ball
                    function drawBall() {

                        // We can now start drawing from a point
                        ctx.beginPath();

                        // We draw a circle that's the size of the variable specified before
                        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);

                        // We set the colour of what the ball should be filled with
                        ctx.fillStyle = "white";

                        // Fill in the ball with the set colour 
                        ctx.fill();

                        // Now we stop drawing
                        ctx.closePath();
                    }

                    // To draw the paddle
                    function drawPaddle() {

                        // We can now start drawing from a point
                        ctx.beginPath();

                        // We draw the paddle using the variable specified before
                        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);

                        // We set the colour of what the paddle should be filled with
                        ctx.fillStyle = "white";

                        // Fill in the paddle with the set colour 
                        ctx.fill();

                        // Now we stop drawing
                        ctx.closePath();
                    }

                    // To draw the blocks
                    function drawBricks() {

                        // For each block in our array...
                        for (column = 0; column < brickColumnCount; column++) {
                            for (row = 0; row < brickRowCount; row++) {
                                if (bricks[column][row].status == 1) {

                                    // We find the destination by taking into account the blocks size and padding and multiplying by the row and column we're on
                                    var brickX = (row * (brickWidth + brickPadding)) + brickOffsetLeft + ((canvas.width - ((brickPadding + brickWidth) * brickRowCount) - brickOffsetLeft) / 2);
                                    var brickY = (column * (brickHeight + brickPadding)) + brickOffsetTop;

                                    // We record the info in each block's x and y variables
                                    bricks[column][row].x = brickX;
                                    bricks[column][row].y = brickY;

                                    // We can now start drawing from a point
                                    ctx.beginPath();

                                    // We draw the blocks using the variable specified before
                                    ctx.rect(brickX, brickY, brickWidth, brickHeight);

                                    // We set the colour of what the blocks should be filled with
                                    ctx.fillStyle = "white";

                                    // Fill in the blocks with the set colour 
                                    ctx.fill();

                                    // Now we stop drawing
                                    ctx.closePath();
                                }
                            }
                        }
                    }

                    // To draw the score
                    function drawScore() {

                        // Set the font for the score
                        ctx.font = "16px Helvetica";

                        // Set the colour of the font
                        ctx.fillStyle = "white";

                        // Insert the text into the top left corner
                        ctx.fillText("Score: " + score, 8, 20);
                        // (((brickRowCount - (brickRowCount % 1)) * (brickColumnCount - (brickColumnCount % 1))) * 10)
                    }

                    // To draw the lives text
                    function drawLives() {

                        // Set the font for the lives text
                        ctx.font = "16px Helvetica";

                        // Set the colour of the font
                        ctx.fillStyle = "white";

                        // Insert the text into the top right corner
                        ctx.fillText("Lives: " + lives, canvas.width - 100, 20);
                    }

                    // To draw the lives text
                    function drawLevel() {

                        // Set the font for the lives text
                        ctx.font = "16px Helvetica";

                        // Set the colour of the font
                        ctx.fillStyle = "white";

                        // Insert the text into the top right corner
                        ctx.fillText("Level: " + level, (canvas.width - 50) / 2, 20);
                    }

                    // To draw the game itself
                    function draw() {

                        // Draw the game map
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Draw the game elements
                        drawBricks();
                        drawBall();
                        drawPaddle();
                        drawScore();
                        drawLives();
                        drawLevel();

                        // We check to see is the ball has come into contact with something
                        collisionDetection();

                        // If the ball has gone past the left or right side of the canvas, it goes in the reverse direction
                        if (((x + dx) > (canvas.width - ballRadius)) || ((x + dx) < ballRadius)) {
                            dx = -dx;
                        }

                        // If the ball has gone past the top side of the canvas, it goes in the reverse direction
                        if ((y + dy) < ballRadius) {
                            dy = -dy;

                            // If the ball has gone past the bottom side of the canvas...
                        } else if (y + dy > canvas.height - ballRadius) {
                            // If the ball is in contact with the paddle, it goes in the reverse direction
                            if (x > paddleX && x < paddleX + paddleWidth) {
                                dy = -dy;

                                // Otherwise, the ball must have passed the paddle and has hit the bottom of the canvas, in this case...
                            } else {
                                // We decrease the amount of lives by 1
                                --lives;

                                // If we're out of lives, we display a Game Over message and reload the page
                                if (!lives) {
                                    alert("GAME OVER");
                                    document.location.reload();
                                } else {

                                    // Otherwise we reset the ball and paddle location
                                    x = canvas.width / 2;
                                    y = canvas.height - 30;
                                    dx = originalDX;
                                    dy = originalDY;
                                    paddleX = (canvas.width - paddleWidth) / 2;
                                }
                            }
                        }

                        // If the player presses an arrow key and the paddle is within the canvas, the paddle moves
                        if (rightPressed && paddleX < canvas.width - paddleWidth) {
                            paddleX += 7;
                        } else if (leftPressed && paddleX > 0) {
                            paddleX -= 7;
                        }

                        // We move the ball
                        x += dx;
                        y += dy;

                        // The program does the smoothing of the animation for us
                        requestAnimationFrame(draw);
                    }

                    // We draw the game map and the result of what has transpired in the past 1000ms
                    draw();
                }

            }, 1000);
        });
    }
}