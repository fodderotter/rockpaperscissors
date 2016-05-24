var min = $("#setMin"),
	sec = $("#setSec"),
	minSet = "00",
	secSet = "00",
	gameTime,
	gameMin = $("#gameMin"),
	gameSec = $("#gameSec"),
	wins = 0,
	losses = 0,
	ties = 0,
	gameStarted = false,
	rock = $("#playerRock"),
	paper = $("#playerPaper"),
	scissors = $("#playerScissors")


$(document).ready(function() {

    // ***setting timer logic***

    // restricting negative numbers
    min.keydown(function(e) {
        if (e.which === 189) {
            return false;
        }
    })
    sec.keydown(function(e) {
        if (e.which === 189) {
            return false;
        }
        else if(sec.val() > 60){
        	return false;
        }
    })

    // updating time based on input
    min.change(function() {
        if (minSet > 9) {
            minSet = min.val();
            gameMin.text(minSet);
        } else {
            minSet = min.val();
            gameMin.text("0" + minSet);
        }
    })
    sec.change(function() {
        if (secSet > 9) {
            secSet = sec.val();
            gameSec.text(secSet);
        } else {
            secSet = sec.val();
            gameSec.text("0" + secSet);
        }
    })

    // countdown logic
    var startGame = function(cb) {
        gameStarted = true;
        if (!min) {
            min = 0;
        }
        if (!sec) {
            sec = 0;
        }
        gameTime = parseInt(minSet * 60) + parseInt(secSet);
        var interval = setInterval(function() {
            if (Math.floor(gameTime / 60) < 10) {
                gameMin.html("0" + Math.floor(gameTime / 60));
            } else {
                gameMin.html(Math.floor(gameTime / 60));
            }
            if (gameTime % 60 < 10) {
                gameSec.html("0" + gameTime % 60);
            } else {
                gameSec.html(gameTime % 60);
            }
            if (Math.floor(gameTime / 60) === 0 && gameTime % 60 < 11) {
                gameMin.html("Only 00").css("color", "red");
                if (gameTime % 60 === 10) {
                    gameSec.html(gameTime % 60 + " left!").css("color", "red");
                } else {
                    gameSec.html("0" + gameTime % 60 + " left!");
                }
            }
            gameTime-- || (clearInterval(interval), cb());
        }, 1000);        
    };

    // ***gamestart logic***
    
    $("#start").click(function() {
    	$(this).prop("disabled", true);
    	min.prop("disabled", true);
    	sec.prop("disabled", true);
        startGame(function() {            
            $("#start").prop("disabled", false);
            min.prop("disabled", false);
    		sec.prop("disabled", false);
            gameStarted = false;
        })
    });

    // randomizing com choice and keeping track of scores

    $(".pick").click(function() {
        var playerChoice = this.id;
        var comChoice = Math.floor(Math.random() * 3) + 1;
        if (!gameStarted) {
            return false;
        } else {
            if (playerChoice === "playerRock") {
            	paper.css("color", "black");
            	scissors.css("color", "black");
                if (comChoice === 1) {
                    ties++;
                    $("#ties").html(ties);
                    rock.css("color", "orange")
                } else if (comChoice === 2) {
                    losses++;
                    $("#losses").html(losses);
                    rock.css("color", "red")
                } else {
                    wins++;
                    $("#wins").html(wins);
                    rock.css("color", "green")
                }
            } else if (playerChoice === "playerPaper") {
            	rock.css("color", "black");
            	scissors.css("color", "black");
                if (comChoice === 1) {
                    wins++;
                    $("#wins").html(wins);
                    paper.css("color", "green")
                } else if (comChoice === 2) {
                    ties++;
                    $("#ties").html(ties);
                    paper.css("color", "orange")
                } else {
                    losses++;
                    $("#losses").html(losses);
                    paper.css("color", "red")
                }
            } else {
            	paper.css("color", "black");
            	rock.css("color", "black");
                if (comChoice === 1) {
                    losses++;
                    $("#losses").html(losses);
                    scissors.css("color", "red");
                } else if (comChoice === 2) {
                    wins++;
                    $("#wins").html(wins);
                    scissors.css("color", "green");
                } else {
                    ties++;
                    $("#ties").html(ties);
                    scissors.css("color", "orange");
                }
            }
        }
    })

})