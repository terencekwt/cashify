var moles = new Array();
var attempts = 0;
var plays = 0;
var iconValues = [-100, -25, -50, -100, -100, -50, -50, -50, -25, -25, -25, 50, 50];
var value = [25, 50, 100];
var variations = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
var positions = [25, 150, 275];
var gameOver = false;
var gameStarted = false;
var gamePaused = false;
var score = 400;
var popUp;
var moleClicked = false;
//var animated;

var layer = new collie.Layer({
    width: 400,
    height: 400
});


//animated background should move after mole is clicked
collie.ImageManager.add({
    ground: "/game1/background.png",
    icon0: "/game1/icons/icon_bankruptcies.png",
    icon1: "/game1/icons/icon_closingcards.png",
    icon2: "/game1/icons/icon_wageattachments.png",
    icon3: "/game1/icons/icon_default.png", //named dfault beacuse default is a keyword
    icon4: "/game1/icons/icon_foreclosures.png",
    icon5: "/game1/icons/icon_judgements.png",
    icon6: "/game1/icons/icon_latepayments.png",
    icon7: "/game1/icons/icon_lawsuits.png",
    icon8: "/game1/icons/icon_liens.png",
    icon9: "/game1/icons/icon_multiplecards.png",
    icon10: "/game1/icons/icon_newcredit.png",
    icon11: "/game1/icons/icon_payingontime.png",
    icon12: "/game1/icons/icon_credithistory.png"
});

var ground = new collie.DisplayObject({
    x: 0,
    y: 0,
    width: 400 * 2,
    height: 600 * 2,
    backgroundImage: "ground",
    backgroundRepeat: "repeat-y",
    //rangeX: [-400, 0],
    rangeY:[-600, 0],
    positionRepeat: true,
    velocityY:0
}).bottom(0).addTo(layer);

function setAnimation(speed){             //changes the vertical animation of the background. Positive moves the background downward, Negative moves upward 
    ground.set("velocityY", speed); 
}

function addMoles() {
    var i = 0;
    var good = 0;
    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
        	var randomIndex = randomNumber(0, 12);
        	if(randomIndex === 11 || randomIndex === 12){
				good++;
			}
            moles[i] = new collie.DisplayObject({
                width: 100,
                height: 100,
                x: positions[x],
                y: positions[y],
                //backgroundColor: "#6F4E37",
                backgroundImage: "icon" + randomIndex,
                fitImage: true,
                opacity: 1,
                visible: false,
                mass: iconValues[randomIndex]+variations[randomNumber(0, 10)]
            }).addTo(layer);
            if(iconValues[randomIndex] === -100){
                moles[i].set("mass", -100);
            }
            i++;
        }
    }
	while(good < 2){
		var index = randomNumber(0, 8);
		moles[index].set("backgroundImage", "icon" + randomNumber(11, 12));    	
		moles[index].set("mass", (50 + variations[randomNumber(0, 10)]));
    	good++;
	}
}

function resetMoles(){
	var good = 0;
    moles.forEach(function(mole){
        var randomIndex = randomNumber(0,12);
        if(randomIndex === 11 || randomIndex === 12){
			good++;
		}
		if(iconValues[randomIndex] === -100){
			mole.set("mass", -100);
			mole.set("backgroundImage", "icon" + randomIndex);
		}
		else{
			mole.set("mass", (iconValues[randomIndex] + variations[randomNumber(0, 10)]));
			mole.set("backgroundImage", "icon" + randomIndex);
		}
		while(good < 2){
			var index = randomNumber(0, 8);
			moles[index].set("backgroundImage", "icon" + randomNumber(11, 12));    	
			moles[index].set("mass", (50 + variations[randomNumber(0, 10)]));
			good++;
		}
	})
}
     
addMoles();

moles.forEach(function(mole) {
    mole.attach({
        "click" : function() {
            if (gameStarted && !gamePaused) {
                moleClicked = true;
                if(Math.floor(plays/4) % 2 === 0){
                	updateScore(mole.get("mass"));
                	if (mole.get("mass") > 0)
                    	setAnimation(80);
					else if (mole.get("mass") < 0)
						setAnimation(-80);
                }
                else{
	                updateScore((mole.get("mass")));
	                if (mole.get("mass") > 0)
	                    setAnimation(-80);
					else if (mole.get("mass") < 0)
                   		setAnimation(80);
                }
                moles.forEach(function(mole) {
                    hideMole(mole);
                });
                plays++;
            }
        }
    });
});


function randomNumber(minNumber, maxNumber){ //minNumber <= maxNumber && minNumber, maxNumber >= 0
    if (minNumber != 0)
        return Math.floor((Math.random()*maxNumber)+minNumber);
    else
        return Math.floor((Math.random()*(maxNumber+1))+minNumber);
}


function showMole(mole) {
    mole.set("visible", true);
}

function hideMole(mole) {
    mole.set("visible", false);
}

function popUpMoles() {
    if (gameStarted && !gamePaused) {
        moleClicked = false;
        setAnimation(0);
        moles.forEach(function(mole) {
            var appearTime;
            setTimeout(function() {if (gameStarted && !moleClicked && !gamePaused) showMole(mole);}, appearTime = randomNumber(800, 1400));
            setTimeout(function() {if (!gamePaused) hideMole(mole);}, appearTime + randomNumber(800, 1200));
        });
        resetMoles();
        popUp = setTimeout(popUpMoles, 4000);
    }
}

function updateScore(points) {
    score += points;
    $("#quarter").html(Math.floor(plays/16));
    $("#plays").html(plays+1);
    $("#score").html(score);
    if (score >= 800 || score <= 0) {
        gameOver = true;
        stopGame();
    }
}

function scoreReset(){
    score = 400;
    plays = 0;
    updateScore(0);
}

scoreReset();


$("#playButton").unbind("click");
$("#playButton").click(startGame);


function startGame() {
    if (gameStarted == false) {
        gameStarted = true;
        if (gameOver == true) {
            scoreReset();
            gameOver = false;
        }
        popUpMoles();
    }
    else if (gamePaused == true) {
        popup = setTimeout(function() {
            gamePaused = false;
            popUpMoles();
        }, 1000);
    }
}

$("#animate").unbind("click");
$("#animate").click(animateIt);

function animateIt(){
    setAnimation(-80);
    //gamePaused = true;
}

$("#stopButton").unbind("click");
$("#stopButton").click(stopGame);


function stopGame(){
    setAnimation(0);
    gameStarted = false;
    clearTimeout(popUp);
    moles.forEach(function(mole) { 
        hideMole(mole);
    });
    if (!gameOver)
        scoreReset();
    else {
        $.ajax({
            url: "/fake/database.php",
            success: function(data) {
            }
        });
        if (score >= 800) {
            
            touchdown();

            alert("You win!");
        }
        else if (score <= 0)
            alert("Game Over!");
    }
}

function touchdown() {
             collie.ImageManager.addImages({
                "yame" : "http://jindo.dev.naver.com/collie/img/small/yame_walk.png"
            });
         
            var oAvatar = new collie.DisplayObject({
                x : "center",
                y : "center",
                width : 129.4,
                height : 165,
                backgroundImage : "yame"
            }).addTo(layer);
             
            collie.Timer.cycle(oAvatar, "18fps", {
                from : 0,
                to : 8,
                loop : 0
            });
}

collie.Renderer.addLayer(layer);
collie.Renderer.load(document.getElementById("container"));
collie.Renderer.start();
