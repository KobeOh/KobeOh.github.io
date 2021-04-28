var deck = [];
var playerHand = [];
var dealerHand = [];
var playerStack = 20;
var playerBet = 0;
var gameOver = true;
var valueDict = {"a": 11, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, 
                    "7": 7, "8": 8, "9": 9, "t":10, "j":10, "q":10, "k":10};

function playerWins(){
    playerStack += 2 * playerBet;
    console.log("You win! You have $" + playerStack.toString());
    gameOver = true;
}

function dealerWins(){
    console.log("You Lose :( You have $" + playerStack.toString());
    gameOver = true;
}

function tie(){
    playerStack += playerBet;
    console.log("Tie Game~ You have $" + playerStack.toString());
    gameOver = true;
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function getBet(){
    var amt = parseInt(prompt('how much would you like to bet? you have $' + playerStack, 0));

    if (typeof amt != typeof 1 || amt > playerStack || amt < 1) {
        console.log("Invalid input: please try again");
        getBet();
    } else {
        playerBet = amt;
        playerStack -= amt;
    }
}

function shuffleDeck() { 
    var newDeck = [];
    for (suit of ["s", "h", "c", "d"]) {
        for (val of ["a", "2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k"]) {
            newDeck.push(val + suit);    
        }
    }

    deck = shuffle(newDeck);
}

function dealPlayer() {
    playerHand.push(deck.pop());
}

function dealDealer() { 
    if (dealerHand.length == 0) {
        //Give card face-down
        dealerHand.push(deck.pop());
    } else {
        //Give card face-up
        dealerHand.push(deck.pop());
    }
}

function dealCards() { 
    playerHand = [];
    dealerHand = [];

    dealPlayer();
    dealPlayer();
    dealDealer();
    dealDealer();
}

function playerValue() {
    var value = 0;
    var aces = 0;

    for (card of playerHand) {
        num = card.substring(0, 1);
        if (num == "a") {
            aces += 1;  
        }
        value += valueDict[num];
    }

    while(value > 21 && aces > 0) {
        value -= 10;
        aces -=1;
    }

    return value;
}

function dealerValue() {
    var value = 0;
    var aces = 0;

    for (card of dealerHand) {
        num = card.substring(0, 1);
        if (num == "a") {
            aces += 1;  
        }
        value += valueDict[num];
    }

    while(value > 21 && aces > 0) {
        value -= 10;
        aces -=1;
    }

    return value;
}

function checkNaturals() { 
    if (playerValue() == 21 && dealerValue() != 21) {
        console.log("The Dealer's hand was " + dealerHand.toString());
        console.log("Your hand was " + playerHand.toString());
        playerWins();
    } else if (playerValue() != 21 && dealerValue() == 21) {
        console.log("The Dealer's hand was " + dealerHand.toString());
        console.log("Your hand was " + playerHand.toString());
        dealerWins();
    } else if (playerValue() == 21 && dealerValue() == 21) {
        console.log("The Dealer's hand was " + dealerHand.toString());
        console.log("Your hand was " + playerHand.toString());
        tie(); 
    }

}

function playerTurn() {
    while (playerValue() < 21) { 
        console.log("Your hand is: " + playerHand.toString() + "(value: " + playerValue().toString() + ")");
        console.log("The dealer is showing a " + dealerHand[1]);

       var hit = prompt('Would you like to hit? (type y/n)', "n");

        if(hit == "y") {
            dealPlayer();
        } else {
            break;
        }
    }

    if (playerValue() > 21) {
        console.log("You have Busted! Your hand is: " + playerHand.toString() + "(value: " + playerValue().toString() + ")");
        dealerWins();
    }

}

function dealerTurn() { 
    console.log("The Dealer's hand is: " + dealerHand.toString() + "(value: " + dealerValue().toString() + ")");

    while(dealerValue() < 17) { 
        dealDealer();
        console.log("The dealer has hit! The Dealer's new hand is: " + dealerHand.toString() + "(value: " + dealerValue().toString() + ")")
    }

    if (dealerValue() > 21) {
        console.log("The Dealer has Busted! Their hand is: " + dealerHand.toString() + "(value: " + dealerValue().toString() + ")");
        playerWins();
    }
}

function checkWinner() { 
    if (playerValue() > dealerValue()) {
        playerWins();
    } else if (playerValue() < dealerValue()) {
        dealerWins();
    } else {
        tie();
    }

}

function playRound() {
    gameOver = false;
    getBet();
    shuffleDeck();
    dealCards();
    checkNaturals();
    if (!gameOver){
        playerTurn();
    }
    if (!gameOver){
        dealerTurn();
    }
    if(!gameOver) {
        checkWinner();
    }
}