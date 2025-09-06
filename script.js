let score =  JSON.parse(localStorage.getItem('score'));
  if (!score) {
    score = {
      wins: 0,
      looses: 0,
      ties: 0
    }
  }

  function resetScore() {
    score = {
      wins: 0,
      looses: 0,
      ties: 0
    }
    localStorage.removeItem('score');
    document.querySelector('.score').innerText = `Score Reset - Wins: ${score.wins}, Losses: ${score.looses}, Ties: ${score.ties}`;
  }

  //autoplay function 
  //NB: setinterval in an asynchronous function, it does not support hoisting
  let isAutoPlaying = false;
  let intervalId;

   function autoPlay() {
    if (!isAutoPlaying ) {
     intervalId = setInterval(function() {
        const playerMove = getComputerMove();
        playGame(playerMove);
        }, 1000);
      isAutoPlaying = true; 
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false; 
    }
    } 

  function getComputerMove() {
    const randomNumber = Math.random();
    
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber < 1) {
      computerMove = 'scissors';  
    }
    console.log('Computer move is: ' + computerMove + randomNumber);
    return computerMove;
  }
      
  function playGame(playerMove) {
    computerMove = getComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
     if (computerMove === 'rock') {
          result = 'You Loose';
      } else if (computerMove === 'paper') {
          result = 'You Win';
      } else if (computerMove === 'scissors') {
          result = 'Tie';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
          result = 'Tie';
      } else if (computerMove === 'paper') {
          result = 'You Loose';
      } else if (computerMove === 'scissors') {
          result = 'You Win';
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
          result = 'You Win';
      } else if (computerMove === 'paper') {
          result = 'Tie';
      } else if (computerMove === 'scissors') {
          result = 'You Loose';
      }

    }

    // score increment
    if (result === 'You Win') {
      score.wins += 1
    } else if (result === 'You Loose') {
      score.looses += 1
    } else if (result === 'Tie') {
      score.ties += 1
    }

    function updateScoreElement() {
      document.querySelector('.score').innerHTML =`Wins: ${score.wins}, Losses: ${score.looses}, Ties: ${score.ties}`;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.result').innerHTML = result;
    document.querySelector('.move').innerHTML =`You <img src="${playerMove}-emoji.png" alt="${playerMove}">
    <img src="${computerMove}-emoji.png" alt="${computerMove}"> Computer`;
    updateScoreElement();
  }