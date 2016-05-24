var min = $("#setMin");
var sec =	$("#setSec");
var minSet = "00";
var secSet = "00";
var gameTime;
var gameMin = $("#gameMin");
var gameSec = $("#gameSec");


$(document).ready(function(){

	// setting timer logic

	// restricting negative numbers
	min.keydown(function(e){				
		if(e.which === 189){
			return false;
		}	
	})
	sec.keydown(function(e){
		if(e.which === 189){
			return false;
		}
	})

	// updating time based on input
	min.keyup(function(){
		if(minSet > 9){
			minSet = min.val();
			gameMin.text(minSet);
		}
		else{
			minSet = min.val();
			gameMin.text("0"+minSet);
		}
	})
	sec.keyup(function(){
		if(secSet > 9){
			secSet = sec.val();
			gameSec.text(secSet);
		}
		else{
			secSet = sec.val();
			gameSec.text("0"+secSet);		
		}
	})

	// countdown logic
	var startGame = function(callback){		
		gameTime = parseInt(min.val() * 60) + parseInt(sec.val());
		var interval = setInterval(function(){
			if(Math.floor(gameTime / 60) < 10){
				gameMin.html("0" + Math.floor(gameTime / 60));
			}
			else{
				gameMin.html(Math.floor(gameTime / 60));
			}
			if(gameTime % 60 < 10){
				gameSec.html("0" + gameTime % 60);
			}
			else{
				gameSec.html(gameTime % 60);
			}
			gameTime-- || (clearInterval(interval), callback());
		}, 1000);
	};

	// gamestart logic
	$("#start").click(function(){
		startGame(function(){
			alert("test");
		})
	});

})