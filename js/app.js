/**
 * @description Display the cards on the page, shuffle the list of cards using the shuffle method, loops through each li and create its HTML <i> with a random card
 * @returns undefined
 */
function display() {
	// Create a list that holds all of your cards
	let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
	let li = $(".deck li");
	li.empty().removeClass().addClass("card");
	// li.addClass("match");
	shuffle(cards);
	// loops thty each li and adds new card to it
	li.each(function(index, li) {
		let eachLi = $(li);
		eachLi.append("<i class='fa fa-" + cards[index] + "'></i>");
	});
}

/**
* @description Cards shuffle function
* @param {array} array of cards to shuffle
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



let Card = function(card) {
	this.card = card;
}

function listOfOpenCards() {

}

function lockedOpenCards() {

}

function removeCard() {

}

let ClickCard = function(){
	$(".deck li").click(function() {
		return $(this).addClass("match");
	});
}
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
