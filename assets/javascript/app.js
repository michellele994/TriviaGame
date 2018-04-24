$(document).ready(function () {
	//These variables set answers for certain questions in the trivia game.
	var trashChoice = Math.floor(Math.random() * 5) + 3;
	var roomChoice = Math.floor(Math.random() * 5) + 3;
	//This a large, large (probably inefficient) array of trivia questions, their answers, and the answers to the answers (whether or not they are true/false)
	var questions =
		[
			["When is mom's birthday?",
				["June 4th", "April 10th", "December 2nd", "November 16th"],
				[false, false, false, true]],
			["You are helping mom make Thanksgiving dinner. At what internal temperature should turkey be cooked to?",
				["200", "165F", "150F", "175F"],
				[false, true, false, false]],
			["How many times did mom remind you to take out the trash?<br><h6>Hint: Look around!</h6>",
				[trashChoice - 2, trashChoice - 1, trashChoice, trashChoice + 1],
				[false, false, true, false]],
			["Mom and dad are going out to dinner tonight. Does that dress make mom look fat?",
				["Yes", "Yes", "No", "Yes"],
				[false, false, true, false]],
			["Mom is concerned you are not drinking enough water. How much water should you drink everyday?",
				["16 glasses of water", "8 glasses of water", "10 glasses of water", "7 glasses of water"],
				[false, true, false, false]],
			["When is mother's day in 2018?",
				["May 12", "May 11", "May 13", "May 10"],
				[false, false, true, false]],
			["You are helping mom make guacamole. She wants you to dice the onions. What should this look like?",
				["A", "B", "C", "D"],
				[true, false, false, false]],
			["Mom is concerned about your vegetable intake. Which of these vegetables has the most amount of nutrients per serving?",
				["Potato", "Kale", "Broccoli", "Mushrooms"],
				[false, true, false, false]],
			["You are setting up the table for dinner. What is the correct table set up?",
				["A", "B", "C", "D"],
				[true, false, false, false]],
			["How many times did mom remind you to clean your room today?<br><h6>Hint: Look around!</h6>",
				[roomChoice - 1, roomChoice + 1, roomChoice - 2, roomChoice],
				[false, false, false, true]],
			["Mom is asking you to make pie. Using Martha Stewart's 'Perfect Apple Pie' recipe, how long should you cool the pie before serving?",
				["45 minutes", "2 hours", "30 minutes", "1 hour"],
				[false, false, false, true]]
		];

	//Initializing variables...
	var showQuestion;
	var countdown;
	var qCount = 0;
	var tCount = 0;
	var timer = 8;
	var correctAnswer = 0;
	var currWrong = 0;
	var wrongs = 0;
	var corrects = 0;
	var timesup = 0;
	var currCorrect = 0;
	var hasClicked = false;

	//When the "Start" button is clicked, the game will start!
	$("#startbutton").click(function () {
		initGame(true);

	});

	function initGame(hasStarted) {
		if (hasStarted) {
			//clears the restart button if there was one present
			$("#restart").empty();
			$("#question").empty();

			//"nextQuestion" function runs first so that the first question shows up right away.
			nextQuestion();
			//The following questions afterwards will appear in timed intervals.
			showQuestion = setInterval(nextQuestion, 15000);
			//This set of code first checks to see if an answer has already been clicked to prevent double-clicking, then uses the function "checkRightWrong" to determine if a choice was correct or not.
			if (hasClicked === false) {
				$("#choice1").click(function () {
					checkRightWrong(0);
					hasClicked = true;
				});
				$("#choice2").click(function () {
					checkRightWrong(1);
					hasClicked = true;
				});
				$("#choice3").click(function () {
					checkRightWrong(2);
					hasClicked = true;
				});
				$("#choice4").click(function () {
					checkRightWrong(3);
					hasClicked = true;
				});
			}
		}
	}

	//This activates the next question in the array and starts the timer.
	function nextQuestion() {
		if (qCount < questions.length) {
			$(".beginning").empty();
			countdown = setInterval(updateTime, 1000);
			setResponses();
		}
	}

	//This function sets up the template for the qustion and the answer choices. 
	function setResponses() {
		$("#question").html("<h1>" + questions[qCount][0] + "</h1>");
		//creates an eggtimer div
		$("#timer").html("<div id='eggtimer'></div>");
		//Displays a question image
		$("#questionimage").html("<img src='assets/images/question" + qCount + ".png'>");

		//displays answers
		$("#choice1").html("<button id=choice1>" + questions[qCount][1][0] + "</button>");
		$("#choice2").html("<button id=choice2>" + questions[qCount][1][1] + "</button>");
		$("#choice3").html("<button id=choice3>" + questions[qCount][1][2] + "</button>");
		$("#choice4").html("<button id=choice4>" + questions[qCount][1][3] + "</button>");

		//for certain questions, there is a popUp function
		if (qCount === 2) {
			for (var i = 0; i < trashChoice; i++) {
				popUp("Remember to take out the trash!");
			}
		}
		if (qCount === 9) {
			for (var i = 0; i < roomChoice; i++) {
				popUp("Remember to clean your room!");
			}
		}
		tCount++;
	}

	//This function checks if an answer clicked was correct or incorrect, sets the timer = 0 once chosen.
	function checkRightWrong(choice) {
		if (questions[qCount][2][choice]) {
			timer = 0;
			currCorrect++;
		}
		else {
			timer = 0;
			currWrong++;
		}
	}

	//This function clears questions and answers and any popUps to set up the canvas for the next question.
	function clearQuestions() {
		$("#question").empty();
		$("#questionimage").empty();
		$("#choice1").empty();
		$("#choice2").empty();
		$("#choice3").empty();
		$("#choice4").empty();
		$("#popup").empty();
	}

	//This function is used for the special questions that require popups to randomly appear withn the screen. 
	function popUp(saying) {
		var divHeight = 15;
		var divWidth = 150;
		var posX = Math.floor(Math.random() * ($(document).width() - divWidth));
		var posY = Math.floor(Math.random() * ($(document).height() - divHeight));
		var newDiv = $("<div id='popupdiv'>" + saying + "</div>").css({
			"left": posX + "px",
			"top": posY + "px"
		});
		var updateDiv = $("#popup");
		updateDiv.append(newDiv);
	}

	//This function is used to display the correct answers after a question has been missed or answered.
	function displayCorrect() {
		setTimeout(function () {
			for (var i = 0; i < 4; i++) {
				if (questions[qCount - 1][2][i] === true) {
					correctAnswer = i;
				}
			}
			$(".beginning").html("<h1>The correct answer was... </h1><br><img src='assets/images/question" + (qCount - 1) + ".png'><br><h1>" + questions[qCount - 1][1][correctAnswer] + "</h1>");
		}, 4000);
		hasClicked = false;
	}

	//This function displays the end screen when the triva has ran through the entire array of questions
	function displayEndScreen() {
		setTimeout(function () {
			$(".beginning").empty();
			$("#question").html("<h1>That's all! Did you make Mom happy?</h1>");
			$("#restart").html("<h6>Correct Answers:</h6> " + corrects +
				"<br><h6>Wrong Answers:</h6> " + wrongs +
				"<br><h6>Missed:</h6> " + timesup +
				"<br><button id='restartbutton'>Try again?</button>");

			//These set the different images of mom as the user if the user has done well or poorly.
			if (corrects === questions.length) {
				$("#questionimage").html("<img src='assets/images/momlove.png'>");
			}
			else if (corrects > wrongs && corrects > timesup && (wrongs > 0 || timesup > 0)) {
				$("#questionimage").html("<img src='assets/images/momokay.png'>");
			}
			else {
				$("#questionimage").html("<img src='assets/images/momupset.png'>");
			}

			clearInterval(showQuestion);
			//This ends the game, or clears the variables.
			endGame();
			//This says that if the restart button is pressed, the game will begin again without refreshing the page.
			$("#restartbutton").click(function () {
				initGame(true);
			});
		}, 8000);
	}

	//refreshes all variables
	function endGame() {

		showQuestion;
		countdown;
		qCount = 0;
		tCount = 0;
		timer = 8;
		correctAnswer = 0;
		currWrong = 0;
		wrongs = 0;
		corrects = 0;
		timesup = 0;
		currCorrect = 0;
		hasClicked = false;
	}

	//This function updates the timer and runs certain statements if timer has ran out.
	function updateTime() {
		//If there is still time, continue updating.
		if (timer > 0) {
			timer--;
			$("#eggtimer").html("Seconds left: 0" + timer);
		}

		//If player has ran out of time, check if player has made a choice of an answer. 
		else if (timer <= 0) {
			qCount++;
			//Stop the timer
			clearInterval(countdown);
			$("#eggtimer").empty();

			//If the player has made a wrong answer,
			if (currWrong > 0) {
				//clear all the questions
				clearQuestions();

				//display the gif
				$(".beginning").html("<img src='assets/images/wrong.gif'>");

				//Add one to wrongs, currWrong is set back to 0 to continue measuring if here was a wrong answer, and hasClicked returns to false.
				wrongs++;
				currWrong = 0;
			}

			//If the user had made a correct choice,
			else if (currCorrect > 0) {
				//clear the questions
				clearQuestions();

				//display the gif
				$(".beginning").html("<img src='assets/images/correct.gif'>");

				//reset the variables and add one to corrects.
				currCorrect = 0;
				corrects++;
			}

			//If there were no correct or wrong answers made during this question, then that implies that the player has ran out of time.
			else if (currCorrect === 0 && currWrong === 0) {
				//Clears the questions
				clearQuestions();

				//Displays the gif
				$(".beginning").html("<img src='assets/images/timesup.gif'>");

				//Resets the variables and adds one to timesup
				timesup++;
			}
			displayCorrect();
			if (qCount === questions.length) {
				displayEndScreen();
			}
			timer = 8;
		}
	}
});
