// list of correctly guessed cards
let cardList = [];

// use to block multiple clicks
let blockClick = false;

// Player moves counter
let totalMoves = 0;

// Timer start
let time = 0;

// Total stars
let totalStars = 3;

/**
 * @description Display the cards on the page, shuffle the list of cards using the shuffle method, loops through each li and create its HTML <i> with a random card. Resets to full stars.
 * @returns {undefined}
 */
function display() {
	// Create a list that holds all of your cards
	let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
	let li = $(".deck li");
	li.empty().removeClass().addClass("card");
	shuffle(cards);
	// loops through each li and adds new card to it
	li.each(function(index, li) {
		let eachLi = $(li);
		eachLi.append("<i class='fa fa-" + cards[index] + "'></i>");
	});
	cardList = [];
	fullStars();
}

/**
* @description Cards shuffle function
* @constructor
* @param {array} array - Array of cards to shuffle
* @returns {array} Returns shuffled array of cards
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/**
* @description Add cards to cardList, locks matching cards and allows only two open cards ( and keeps them open for 1s )
* @constructor
* @param {object} card - jQuery obj that hold clicked li who represents the clicked card.
* @returns {undefined}
*/
function listOfOpenCards(card) {
	card.addClass("open").addClass("show");
	if (cardList.length === 0 || (cardList.length % 2 === 0)) {
		cardList.push(card); // Only for first card
	}else {
		// Checks if the cards are the same, locks them and pushes last clicked card to cardList array
		if (cardList[cardList.length - 1].children("i").attr("class") === card.children("i").attr("class")) {
			lockedSameCards(cardList[cardList.length - 1], card);
			cardList.push(card);
		}else {
			// blocks multiple clicks if two cards are selected and keeps them open for 1 second
			blockClick = true;
			setTimeout(function() { 
				blockClick = false;
				removeCards(cardList[cardList.length - 1], card);
			}, 1000);
		}
	}
}

/**
* @description Adds first clicked card, block same card being clicked twice, call listOfOpenCards on different card click and checks if the game is won.
* @param {obj} card -  Card being clicked
* @returns Returns {undefined}
 */
function sameCardClicked(card) {
	if (cardList.length === 0) {
		listOfOpenCards(card);
	}else if (cardList.length !== 0 && cardList[cardList.length - 1].index() === card.index()){
		return undefined;
	}else {
		listOfOpenCards(card);
	}
	if (cardList.length === 16) {
		gameWon();
	}
}

/**
* @descripton Locks two identical cards into matching positions with transition plugin
* @ param{object} cardOne - First clicked card
* @ param{object} cardTwo - Second clicked card
* @returns {undefined}
*/
function lockedSameCards(cardOne, cardTwo) {
	cardOne.transition({scale: 1.4}, function() {
		cardOne.transition({scale: 1.0});
	}).addClass("match");
	cardTwo.transition({scale: 1.4}, function() {
		cardTwo.transition({scale: 1.0});
	}).addClass("match");
}

/**
* @descripton Close two different cards and removes last clicked card from the list
* @ param{object} cardOne - First clicked card
* @ param{object} cardTwo - Second clicked card
* @returns {undefined}
*/
function removeCards(cardOne, cardTwo) {
	cardOne.removeClass("open show");
	cardTwo.removeClass("open show");;
	cardList.pop();
}

// Main card click event
let clickCard =	$(".deck li").click(function() {
	if (!blockClick) {
		moves();
		sameCardClicked($(this));
		removeStars();
	}
});

// Restart button
let restartClick = $(".restart").click(function() {
	restartGame();
});

/**
* @descripton Restarts the game, moves, stars, time and hides the modal
* @returns {undefined}
*/
function restartGame() {
	totalMoves = 0;
	time = 0;
	$(".moves").html(totalMoves);
	display();
	$(".modal").hide();
	timePassed;
	// Set win checker to start position
	$(".checker").transition({
		"background-position": "0 0"});
}

/**
* @descripton Add the number of player moves to the counter
* @returns {undefined}
*/
function moves() {
	totalMoves += 1;
	$(".moves").html(totalMoves);
}

/**
* @descripton Remove third star after 24 moves and second after 28 moves.
* @returns {undefined}
*/
function removeStars() {
	let emptyStar = "<li><i class='fa fa-star-o'></i></li>";
	switch (totalMoves) {
		case 22:
			$(".stars li:last-child").replaceWith(emptyStar);
			totalStars = 2;
			break;
		case 27:
			$(".stars li:nth-child(2)").replaceWith(emptyStar);
			totalStars = 1;
			break;
		case 34:
			$(".stars li:first-child").replaceWith(emptyStar);
			totalStars = 0;
			break;
	}
}

/**
* @descripton Resets all stars to full stars
* @returns {undefined}
*/
function fullStars() {
	$("<i class='fa fa-star'></i>").replaceAll(".fa-star-o");
}

/**
* @descripton Visual timer for html
* @returns {ternary}
*/
function timer ( val ) { return val > 9 ? val : "0" + val; }

/**
* @description Game timer
* @returns The ID value returned by setInterval() is used as the parameter for the clearInterval() method.
*/
let timePassed = setInterval( function(){
	$("#seconds").html(timer(++time%60));
	$("#minutes").html(timer(parseInt(time/60,10)));
}, 1000);

/**
* @description The clearInterval() method clears a timer set with the setInterval() method. Note: To be able to use the clearInterval() method, you must use a global variable when creating the interval method.
*/
function clearTimer() {
	clearInterval ( timePassed );
}

/**
* @descripton If cardList contains 16 elements, game will end
* @returns {undefined}
*/
function gameWon() {
	$("#winMoves").html(totalMoves);
	$("#winStars").html(totalStars);
	$("#winSeconds").html(time);
	$(".modal").show();
	// Trigger checker transition using jQuery Transit plugin
	$(".checker").transition({
		"background-position": "-7980px 0",
    	transition: "background 1s steps(38)"});
}

// Game begins!
restartGame();