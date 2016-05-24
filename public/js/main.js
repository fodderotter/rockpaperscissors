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
	playerRock = $("#playerRock"),
	playerPaper = $("#playerPaper"),
	playerScissors = $("#playerScissors"),
    comRock = $("#comRock"),
    comPaper = $("#comPaper"),
    comScissors = $("#comScissors");


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
            if(wins > losses){
                alert("Final Score: " + wins + " wins, " + losses + " losses, " + ties + " ties. You Win!")
            }
            else if(wins < losses){
                alert("Final Score: " + wins + " wins, " + losses + " losses, " + ties + " ties. You Lose!")
            }
            else{
                alert("Final Score: " + wins + " wins, " + losses + " losses, " + ties + " ties. It's a tie!")
            }
            // $("#start").prop("disabled", false);
            $("#reset").prop("disabled", false);
            min.prop("disabled", false);
    		sec.prop("disabled", false);
            gameStarted = false;
        })
    });

    // player choice for primary game function

    $(".pick").click(function() {

        // randomizing com choice

        var playerChoice = this.id;
        var comChoice = Math.floor(Math.random() * 3) + 1;

        // reset colors and hidden attribute on each click

        playerRock.css("color", "black")
        playerPaper.css("color", "black");
        playerScissors.css("color", "black");
        comRock.attr("hidden", true);
        comPaper.attr("hidden", true);
        comScissors.attr("hidden", true);

        // prevent playing when game hasn't started

        if (!gameStarted) {
            return false;
        } else {
            if (playerChoice === "playerRock") {

                if (comChoice === 1) {
                    comRock.attr("hidden", false).css("color", "orange");
                    ties++;
                    $("#ties").html(ties);
                    playerRock.css("color", "orange")
                } else if (comChoice === 2) {
                    comPaper.attr("hidden", false).css("color", "green");
                    losses++;
                    $("#losses").html(losses);
                    playerRock.css("color", "red")
                } else {
                    comScissors.attr("hidden", false).css("color", "red");
                    wins++;
                    $("#wins").html(wins);
                    playerRock.css("color", "green")
                }
            } else if (playerChoice === "playerPaper") {

                if (comChoice === 1) {
                    comRock.attr("hidden", false).css("color", "red");
                    wins++;
                    $("#wins").html(wins);
                    playerPaper.css("color", "green")
                } else if (comChoice === 2) {
                    comPaper.attr("hidden", false).css("color", "orange");
                    ties++;
                    $("#ties").html(ties);
                    playerPaper.css("color", "orange")
                } else {
                    comScissors.attr("hidden", false).css("color", "green");
                    losses++;
                    $("#losses").html(losses);
                    playerPaper.css("color", "red")
                }
            } else {
                if (comChoice === 1) {
                    comRock.attr("hidden", false).css("color", "green");
                    losses++;
                    $("#losses").html(losses);
                    playerScissors.css("color", "red");
                } else if (comChoice === 2) {
                    comPaper.attr("hidden", false).css("color", "red");
                    wins++;
                    $("#wins").html(wins);
                    playerScissors.css("color", "green");
                } else {
                    comScissors.attr("hidden", false).css("color", "orange");
                    ties++;
                    $("#ties").html(ties);
                    playerScissors.css("color", "orange");
                }
            }
        }
    })

    // ***setting reset button***
    $("#reset").click(function(){
        $(this).prop("disabled", true);
        $("#start").prop("disabled", false);
        gameStarted = false;
        wins = 0;
        losses = 0;
        ties = 0;
        $("#wins").html(wins);
        $("#ties").html(ties);
        $("#losses").html(losses);
        min.val("");
        sec.val("");
        gameMin.html("00").css("color", "black");
        gameSec.html("00").css("color", "black");
        playerRock.css("color", "black")
        playerPaper.css("color", "black");
        playerScissors.css("color", "black");
        comRock.attr("hidden", true);
        comPaper.attr("hidden", true);
        comScissors.attr("hidden", true);
    })

})