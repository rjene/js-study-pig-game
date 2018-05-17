var scores, activePlayer, roundScore, dice,
    gamePlaying = true;

//reset everything
init();

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore =0;
    
    //set all to 0
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    
    //hide dice
    document.querySelector('.dice').style.display = 'none';
}


function nextPlayer(){    
    //ternary operator:
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 

    roundScore = 0; //resets for the new player

    //toggle class active to switch UI
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //when dice = 1, hide it because game is reset for the new player
    document.querySelector('.dice').style.display = 'none';
}

//start new game
document.querySelector('.btn-new').addEventListener('click', init);


//play the game
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. generate random number
        dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        //2. update the UI - show dice with correct dots
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update roundScore of player of dice != 1
        if (dice !== 1){
            //set roundScore 
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }else{
            //nextPlayer
            nextPlayer();
        }
    }
});

//hold and set winner
document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if (gamePlaying){
        
        //1. update player score with current score
        scores[activePlayer] += roundScore;

        //2.update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won
        if(scores[activePlayer] >= 10){
            //proclaim the winner
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            //hide the dice
            document.querySelector('.dice').style.display = 'none';
            //update UI for winner - use .winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});