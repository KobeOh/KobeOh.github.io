var deck = [];
var playerHand = [];
var dealerHand = [];
var playerStack = 20;
var playerBet = 1;
var gameOver = true;
var suitDict = {"s": "&spades;", "h":"&hearts;", "c":"&clubs;", "d":"&diams;"}
var valueDict = {"a": 11, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, 
                    "7": 7, "8": 8, "9": 9, "t":10, "j":10, "q":10, "k":10};

var symbolDict = {"a": "A", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", 
                    "7": "7", "8": "8", "9": "9", "t":"10", "j":"J", "q":"Q", "k":"K"};

var minusFiveButton = document.getElementsByClassName("bet-button minus-five")[0];
var minusOneButton = document.getElementsByClassName("bet-button minus-one")[0];
var betButton = document.getElementsByClassName("bet-button bet")[0];
var plusOneButton = document.getElementsByClassName("bet-button plus-one")[0];
var plusFiveButton = document.getElementsByClassName("bet-button plus-five")[0];
var standButton = document.getElementsByClassName("text-row-button stand")[0];
var hitButton = document.getElementsByClassName("text-row-button hit")[0];
var againButton = document.getElementsByClassName("text-row-button play-again")[0];
var leaveButton = document.getElementsByClassName("text-row-button leave-room")[0];

var text = document.getElementById("text-row-message");


function adjustBet(amt) {
    if(playerBet + amt < 1) {
        playerBet = 1;
        amt = 0;
    } else if (playerBet + amt > playerStack) {
        playerBet = playerStack;
        amt = 0;
    }

    playerBet += amt;
    console.log("new bet amount: $" + playerBet.toString());
    betButton.innerHTML = "Bet $" + playerBet.toString();
}

function minusFive() {
    adjustBet(-5);
}

function minusOne() {
    adjustBet(-1);
}

function plusOne() {
    adjustBet(1);
}

function plusFive() {
    adjustBet(5);
}

function playerWins(){
    playerStack += 2 * playerBet;
    console.log("You win! You have $" + playerStack.toString());
    text.innerHTML = "You win $" + (2*playerBet).toString() + "!";
    gameOver = true;

    againButton.classList.remove("hidden");
}

async function dealerWins(){
    console.log("You Lose :( You have $" + playerStack.toString());
    text.innerHTML = "You Lose :(";
    gameOver = true;


    if(playerStack == 0) {
        await sleep(1500)
        text.innerHTML = "Balance: $" + playerStack.toString();
        leaveButton.classList.remove("hidden");
    } else {
        againButton.classList.remove("hidden");
    }


    
}

function tie(){
    playerStack += playerBet;
    console.log("Tie Game~ You have $" + playerStack.toString());
    text.innerHTML = "Tie Game~";
    gameOver = true;

    againButton.classList.remove("hidden");
}

async function playAgain(){
    againButton.classList.add("hidden");

    for(let i = 0; i < dealerHand.length; i++) {
        let card = document.getElementsByClassName("dealer-card-inner num" + (i + 1).toString())[0];
        card.style.transform = "";
        await sleep(200);
    }

    for(let i = 0; i < dealerHand.length; i++) {
        let card = document.getElementsByClassName("dealer-card num" + (i + 1).toString())[0];
        card.style.transform = "";
        await sleep(200);
    }

    for(let i = 0; i < playerHand.length; i++) {
        let card = document.getElementsByClassName("player-card-inner num" + (i + 1).toString())[0];
        card.style.transform = "";
        await sleep(200);
    }

    for(let i = 0; i < playerHand.length; i++) {
        let card = document.getElementsByClassName("player-card num" + (i + 1).toString())[0];
        card.style.transform = "";
        await sleep(200);
    }

    await sleep(200);
    
    text.innerHTML = "Balance: $" + playerStack.toString();
    betButton.innerHTML = "Bet $" + (Math.min(playerStack, playerBet));
    for(b of document.getElementsByClassName("bet-button")){
        b.classList.remove("hidden")    
    }
   
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

    playerStack -= playerBet;
    text.innerHTML = "Balance: $" + playerStack.toString();
    shuffleDeck();
    
    for(b of document.getElementsByClassName("bet-button")){
        b.classList.add("hidden")
    }

    dealCards();
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
    let card = document.getElementsByClassName("player-card num" + playerHand.length.toString())[0];
    let height = document.getElementById('deck').clientHeight * 50/100;

    card.style.transform = "translateX(" + (playerHand.length * 150) + "px) translateY(" + height + "px)";

    let face = document.getElementsByClassName("player-card-back num" + playerHand.length.toString())[0];

    let val = playerHand[playerHand.length - 1]

    face.innerHTML = suitDict[val.substring(1,2)] + "\n" + symbolDict[val.substring(0,1)];

    if(val.substring(1,2) == "s" || val.substring(1,2) == "c") {
        face.style.color = "black";
    } else {
        face.style.color = "red";
    }
}

function flipPlayerCard(num){
    let card = document.getElementsByClassName("player-card-inner num" + (num + 1).toString())[0];

    card.style.transform += "rotateY(180deg)";
}

function dealDealer() { 
    dealerHand.push(deck.pop());

    let card = document.getElementsByClassName("dealer-card num" + dealerHand.length.toString())[0];


    card.style.transform = "translateX(" + (dealerHand.length * 150) + "px) translateY(0px)";

    let face = document.getElementsByClassName("dealer-card-back num" + dealerHand.length.toString())[0];

    let val = dealerHand[dealerHand.length - 1]

    face.innerHTML = suitDict[val.substring(1,2)] + "\n" + symbolDict[val.substring(0,1)];

    if(val.substring(1,2) == "s" || val.substring(1,2) == "c") {
        face.style.color = "black";
    } else {
        face.style.color = "red";
    }
}

function flipDealerCard(num){
    let card = document.getElementsByClassName("dealer-card-inner num" + (num + 1).toString())[0];

    card.style.transform += "rotateY(180deg)";
}

function dealCards() { 
    playerHand = [];
    dealerHand = [];

    setTimeout(dealPlayer, 200);
    setTimeout(dealPlayer, 400);
    setTimeout(dealDealer, 600);
    setTimeout(dealDealer, 800);
    setTimeout(function() { flipDealerCard(0)}, 1000);
    setTimeout(function() { flipPlayerCard(0)}, 1200);
    setTimeout(function() { flipPlayerCard(1)}, 1400);

    setTimeout(checkNaturals, 2000);

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
        flipDealerCard(1);
        console.log("The Dealer's hand was " + dealerHand.toString());
        console.log("Your hand was " + playerHand.toString());
        playerWins();
    } else if (playerValue() != 21 && dealerValue() == 21) {
        flipDealerCard(1);
        console.log("The Dealer's hand was " + dealerHand.toString());
        console.log("Your hand was " + playerHand.toString());
        dealerWins();
    } else if (playerValue() == 21 && dealerValue() == 21) {
        flipDealerCard(1);
        console.log("The Dealer's hand was " + dealerHand.toString());
        console.log("Your hand was " + playerHand.toString());
        tie(); 
    } else {
        standButton.classList.remove("hidden");
        hitButton.classList.remove("hidden");
        text.innerHTML = "It's Your Turn!"
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

function hit() {
    standButton.classList.add("hidden");
    hitButton.classList.add("hidden");

    setTimeout(dealPlayer, 200);
    setTimeout(function() {flipPlayerCard(playerHand.length - 1)}, 400);
    setTimeout(function() {
         if (playerValue() > 21) {
            console.log("You have Busted! Your hand is: " + playerHand.toString() + "(value: " + playerValue().toString() + ")");
            text.innerHTML = "Busted!";
            setTimeout(dealerWins, 1600);
        }   else if (playerValue() == 21) {
            stand();
        }   else{
            standButton.classList.remove("hidden");
            hitButton.classList.remove("hidden");
        }
    }, 800);
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

async function stand() {
    let i = 0;

    text.innerHTML = "Dealer's Turn!"

    standButton.classList.add("hidden");
    hitButton.classList.add("hidden");

    flipDealerCard(1);

    while(dealerValue() < 17) {
        i +=1; 
        await sleep(400);
        dealDealer();
        await sleep(700);
        flipDealerCard(dealerHand.length - 1);
    }

    await sleep(500);

    if (dealerValue() > 21) {
        console.log("The Dealer has Busted! Their hand is: " + dealerHand.toString() + "(value: " + dealerValue().toString() + ")");
        playerWins();
    } else {
        checkWinner();
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


minusFiveButton.onclick = minusFive;
minusOneButton.onclick = minusOne;
plusOneButton.onclick = plusOne;
plusFiveButton.onclick = plusFive;

betButton.onclick = getBet;
hitButton.onclick = hit;
standButton.onclick = stand;
againButton.onclick = playAgain;
