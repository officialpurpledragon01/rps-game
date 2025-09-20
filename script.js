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
  if (!isAutoPlaying) {
  intervalId = setInterval(() => {
      const playerMove = getComputerMove();
      playGame(playerMove);
      }, 1000);
    isAutoPlaying = true;
    document.querySelector('#autoPlay').innerText = 'Stop Autoplay';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false; 
    document.querySelector('#autoPlay').innerText = 'Start Autoplay';
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

  //Agreegator
  let leading = '';
  if (score.wins > score.looses) {
    leading = `You are leading the game `
  } else if (score.wins === score.looses) {
    leading = `No one is leading the game `
  } else if (score.wins < score.looses) {
    leading = `Computer is leading the game `
  }
  sessionStorage.setItem('lead', leading);

  function updateScoreElement() {
    document.querySelector('.score').innerHTML =` 
      <h3> Score Board </h3>
      <p>Wins: ${score.wins} </p> 
      <p>Losses: ${score.looses}</p> 
      <p>Ties: ${score.ties}</p>
      <p class='agreggate'> ${leading}</p>
    `;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.result').innerHTML = result;
  document.querySelector('.move').innerHTML =`
    <span class='myMove'>
      You <img src="${playerMove}-emoji.png" alt="${playerMove}">
    </span>
    <span class='cmpMove'> 
      Computer <img src="${computerMove}-emoji.png" alt="${computerMove}">
    </span>
  `;
  updateScoreElement();
}

const fetchResult = JSON.parse(localStorage.getItem('score'));
let fetchLead = sessionStorage.getItem('lead');

if (!fetchLead) {
  fetchLead = 'loading...';
}

document.querySelector('.score').innerHTML =` 
  <h3> Score Board </h3>
  <p>Wins: ${fetchResult.wins} </p> 
  <p>Losses: ${fetchResult.looses} </p> 
  <p>Ties: ${fetchResult.ties} </p>
  <p class='agreggate'> ${fetchLead} </p>
`;

console.log(crypto.randomUUID());