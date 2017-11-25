$(document).ready(function(){
	//These variables set answers for certain questions in the trivia game.
	var trashChoice = Math.floor(Math.random() * 10)+3;
	var roomChoice = Math.floor(Math.random() * 10)+3;
	//This a large, large (probably inefficient) array of trivia questions, their answers, and the answers to the answers (whether or not they are true/false)
	var questions =
	[
		["When is mom's birthday?", 
			["November 16th", "April 10th", "December 2nd", "June 4th"],
				[true, false, false, false]],
		["You are helping mom make Thanksgiving dinner. At what internal temperature should turkey be cooked to?",
		 	["165F", "200F", "150F", "175F"],
		 		[true, false, false, false]],
		["You are helping mom pick out new towels for the kitchen. Eggshell or creme?",
		 	["Cream", "Eggshell", "neither", "both"],
		 		[false, true, false, false]],
		["How many times did mom remind you to take out the trash?",
		 	[trashChoice-2, trashChoice-1, trashChoice, trashChoice+1],
		 		[false, false, true, false]],
		["Mom and dad are going to dinner tonight. Does that dress make mom look fat?",
		 	["Yes", "Yes", "No", "Yes"],
		 		[false, false, true, false]],
		["Did you finish all of your homework?",
		 	["I will do it tomorrow", "I have already finished it", "I will do it now", "I don't have any homework"],
		 		[false, true, false, false]],
		["Mom is concenred you are not drinking enough water. How much water should you drink everyday?",
		 	["8 glasses of water", "16 glasses of water", "10 glasses of water", "7 glasses of water"],
		 		[true, false, false, false]],
		["When is mother's day in 2018?",
		 	["May 12", "May 11", "May 13", "May 10"],
		 		[false, false, true, false]],
		["What is mom's astrological sign?",
		 	["Aries", "Libra", "Sagittarius", "Scorpio"],
		 		[false, false, false, true]],
		["You are cleaning your room. Click on the room that looks the cleanest.",
		 	["<img src='..images/roomwrong1.png'>", "<img src='..images/roomwrong2.png'>", "<img src='..images/roomright.png'>", "<img src='..images/roomwrong3.png'>"],
		 		[false, false, true, false]],
		["You are setting up the table for dinner. What side does the spoon go on in reference to the plate?",
		 	["<img src='../images/spoontop.png'>", "<img src='../images/spoonbottom.png'>", "<img src='../images/spoonleft.png'>", "<img src='../images/spoonright.png'>"],
		 		[false, false, false, true]],
		["Mom is concerned about your vegetable intake. Which of these vegetables has the most amount of nutrients per serving?",
		 	["Potato", "Mushrooms", "Broccoli", "Kale"],
		 		[false, false, false, true]],
		["What is the correct way to put the dishes away?",
		 	["<img src='../images/disheswrong1.png'>", "<img src='../images/dishesright.png>'", "<img src='../images/disheswrong2.png'>", "<img src='../images/disheswrong3.png'>"],
		 		[false, true, false, false]],
		["What time should you go to bed tonight?",
		 	["9:30PM", "10:30PM", "10:00PM", "9:00PM"],
		 		[false, false, false, true]],
		["What time should you wake up tomorrow?",
		 	["5:30AM", "7:00AM", "6:00AM", "5:00AM"],
		 		[false, false, true, false]],
		["You are helping mom with lunch. She wants you to dice the onions. What should this look like?",
		 	["<img src='..images/onionsright.png'>", "<img src='..images/onionswrong1.png'>", "<img src='..images/onionswrong2.png'>", "<img src='..images/onionswrong3.png'>"],
		 		[true, false, false, false]],
		["You are setting up the table for dinner. What side does the fork go on in the reference to the pate?",
		 	["<img src='../images/forkleft.png'", "<img src='../images/forkright.png'", "<img src='../images/forktop.png'", "<img src='../images/forkbottom.png'"],
		 		[true, false, false, false]],
		["You are washing the dishes. Click on the dish that looks the cleanest.",
		 	["<img src='..images/washwrong1.png'>", "<img src='..images/washright.png'>", "<img src='..images/washwrong2.png'>", "<img src='..images/washwrong3.png'>"],
		 		[false, true, false, false]],
		["How many times did mom remind you to clean your room today?",
		 	[roomChoice-1, roomChoice+1, roomChoice-2, roomChoice],
		 		[false, false, false, true]],
		["Mom is asking you to make pie. Using Marth Stewart's 'Perfect Apple Pie' recpie, how long should you cool the pie before serving?",
		 	["1 hour", "2 hours", "30 minutes", "45 minutes"],
		 		[true, false, false, false]]
	];

	//Initializing variables...
	var showQuestion;
	var countdown;
	var qCount = 0;
	var tCount = 0;
	var timer = 4;


	//This clears the HTML document of any annoying divs, for the appeal of the title of the game.
	$("#timer").html("");

	//When the "Start" button is clicked, the game will play!
	$("#startbutton").click(function() {
		//Clearing the divs which held the title contents to make room for the game
		$("#beginning").html("");
		//"nextQuestion" function runs first so that the first question shows up right away.
		nextQuestion();
		//The following questions afterwards will appear in timed intervals.
		showQuestion = setInterval(nextQuestion, 8000);
		//This checks to see if the user had clicked the right answer.
		$("#choice1").click(function() {
			checkRightWrong(0);
		});
		$("#choice2").click(function() {
			checkRightWrong(1);
		});
		$("#choice3").click(function() {
			checkRightWrong(2);
		});
		$("#choice4").click(function() {
			checkRightWrong(3);
		});
	
	});
	function nextQuestion() {
		if (qCount < questions.length){
			countdown = setInterval(updateTime, 1000);
			setResponses();
		}
	}

	function setResponses() {
		$("#question").html("<h1>"+questions[qCount][0]+"</h1>");
		$("#timer").html("<div id='eggtimer'></div>");
		$("#choice1").html("<button id=choice1>" + questions[qCount][1][0] + "</button>");
		$("#choice2").html("<button id=choice2>" + questions[qCount][1][1] + "</button>");
		$("#choice3").html("<button id=choice3>" + questions[qCount][1][2] + "</button>");
		$("#choice4").html("<button id=choice4>" + questions[qCount][1][3] + "</button>");
		tCount++;
		qCount++;
	}
	function checkRightWrong(choice) {
		if (questions[qCount-1][2][choice])
		{
			console.log("You win");
		}
		else
		{
			console.log("You lose");
		}
	}
	function updateTime() {
		if (timer > 0){
			timer--;
			$("#eggtimer").html("Seconds left: 0" + timer);
		}
		else if (timer <= 0){
			clearInterval(countdown);
			$("#eggtimer").html("Seconds left: 0" + timer);
			timer=4;
		}
	}
});
