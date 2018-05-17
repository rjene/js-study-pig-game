//pig game

//vars to keep track 

var scores, roundScore, activePlayer, gamePlaying = true, dice;

//scores = [0, 0]; //player1, player2
//roundScore = 0; //whats the current score
//activePlayer = 0; //0 first player, 1 second player

//reset
init();

// dice == random number, use Math object

//dice = Math.floor(Math.random() * 6) + 1; // num 1-6;
//console.log(dice);


//document.querySelector('#current-' + activePlayer).textContent = dice; //select stuff like CSS, change content of HTML

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //needs string

//to read content, we can use textContent as well;

//hide image dice
//document.querySelector('.dice').style.display = 'none';
//
////reset values in html to 0
//document.getElementById('score-0').textContent = '0';
//document.getElementById('score-1').textContent = '0';
//document.getElementById('current-0').textContent = '0';
//document.getElementById('current-1').textContent = '0';

//setup event handler  
//calllback function - func called by another func for us
//annonymous func - func without name
document.querySelector('.btn-roll').addEventListener('click', function(){


    
    if (gamePlaying) {
    
        //1. random number generated
        dice = Math.floor(Math.random() * 6) + 1; // num 1-6;


        //2. display result, correct dice number
        //bring style back
        //document.querySelector('.dice').style.display = 'block';
        //set correct number - img-1, img-2, etc
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3. update the round score IF the rolled num is NOT a 1
        if (dice !== 1){
            //add score
            roundScore += dice; //roundScore = roundScore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            //next player
            nextPlayer();
        }
    }
    
});


//Hold button
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying) {
        //add current score to player's global score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won
        if(scores[activePlayer] >= 10){

            //change name to winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            //because someone won
            gamePlaying = false; //game state stop

        }else{
            nextPlayer();
        }
    }
});


function nextPlayer(){
    //next player

    //ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0; //resets

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;


    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    //toggle class --
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //when 1, hide the dice
    document.querySelector('.dice').style.display = 'none';
}


//create a new game
document.querySelector('.btn-new').addEventListener('click', init); //pass init


function init(){
    scores = [0, 0]; //player1, player2
    roundScore = 0; //whats the current score
    activePlayer = 0; //0 first player, 1 second player
    
    
    document.querySelector('.dice').style.display = 'none';

    //reset values in html to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';    
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}







