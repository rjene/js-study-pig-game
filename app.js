/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//set variables 
var scores, roundScore, activePlayer, 
    gamePlaying;

init(); //here we initialize / reset

//generate the random number
//dice = Math.floor(Math.random() * 6) + 1; //between 1 - 6

// set dice number to the activePlayer 
//document.querySelector('#current-' + activePlayer).textContent = dice; //setting value inside an element
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//to get a value from an element
//var x = document.querySelector('#score-0').textContent;
//console.log(x);


//use an event listener click 
//here we use an anonymous function vs using a callback function 
var prevdice;
document.querySelector('.btn-roll').addEventListener('click', function(){ 
    if(gamePlaying){
        //1. generate the random number
        var dice = Math.floor(Math.random() * 6) + 1; //between 1 - 6

        //2. display the result
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block"; //from none, show it with block
        //chnage the image 
        diceDOM.src = "dice-" + dice + ".png";
        
        
        //3. update the round score if the rolled number it not 1
        if(dice === 6 && prevdice === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;

            nextPlayer();
        }else if(dice !== 1){
            //add score                   
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //setting value inside an element

            console.log(dice);
            console.log(prevdice);
        }else{
            nextPlayer();
        }     
        
        prevdice = dice;
    }
    //how to 
});

document.querySelector(".btn-hold").addEventListener('click', function(){
    if(gamePlaying){
        //add global to current score (roundScore)
        scores[activePlayer] += roundScore;
        console.log(scores);

        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check who won the games
        if(scores[activePlayer] >= 20){
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add("winner");
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove("active");
            gamePlaying = false;
        }else{

            //set next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
    //next players
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //using the ternary operator is the same as if-else

    //must set roundScore back to 0 because player got 1 
    roundScore = 0;

    //user gets 0
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //toggle which one is "active"
    //        document.querySelector('.player-0-panel').classList.remove('active');
    //        document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = "none";    
}

document.querySelector(".btn-new").addEventListener("click", init);

//create new - initialize the game - all back to default 
function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; 
    gamePlaying = true;

    //by default, we want to hide the dice image
    document.querySelector(".dice").style.display = "none"; // setting diplay:none inline css


    //set all to zero
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById('name-0').textContent = "Kyle";
    document.getElementById('name-1').textContent = "Tita";
    document.querySelector('.player-0-panel').classList.remove("winner");
    document.querySelector('.player-1-panel').classList.remove("winner");
    document.querySelector('.player-0-panel').classList.remove("active");
    document.querySelector('.player-1-panel').classList.remove("active");
    document.querySelector('.player-0-panel').classList.add("active");

    
}






















