// list of correctly guessed cards
let cardList = [];

// use to block multiple clicks
let blockClick = false;

// Player moves counter
let totalMoves = 0;

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
* @description Block same card being clicked twice
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
}

/**
* @descripton Locks two identical cards into matching positions
* @ param{object} cardOne - First clicked card
* @ param{object} cardTwo - Second clicked card
* @returns {undefined}
*/
function lockedSameCards(cardOne, cardTwo) {
	cardOne.addClass("match");
	cardTwo.addClass("match");
}

/**
* @descripton Close two different cards and removes last clicked card from the list
* @ param{object} cardOne - First clicked card
* @ param{object} cardTwo - Second clicked card
* @returns {undefined}
*/
function removeCards(cardOne, cardTwo) {
	cardOne.removeClass("open").removeClass("show");
	cardTwo.removeClass("open").removeClass("show");
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
	restartGame()
});

/**
* @descripton Restarts the game, moves, stars and time
* @returns {undefined}
*/
function restartGame() {
	totalMoves = 0;
	$(".moves").html(totalMoves);
	display();
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
		case 6:
			$(".stars li:last-child").replaceWith(emptyStar);
			break;
		case 10:
			$(".stars li:nth-child(2)").replaceWith(emptyStar);
			break;
		case 14:
			$(".stars li:first-child").replaceWith(emptyStar);
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


// Game begins!
restartGame()

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
