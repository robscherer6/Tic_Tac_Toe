const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    let boardHTML = '';

    gameboard.forEach((square, index) => {
      //create div, add content to div
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`
    })
    document.querySelector('#gameboard').innerHTML = boardHTML;
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', Game.handleClick);
    })
  }
  //this return exposes start to the outside world
  return {
    render,
  }
})();

const createPlayer = (name, symbol) => {
  return {
    name,
    symbol
  }
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector('#player1').value, 'X'),
      createPlayer(document.querySelector('#player2').value, 'O')
    ]
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  }

  const handleClick = (e) => {
    let index = parseInt(e.target.id.split('-')[1]);
    //console.log(typeof(index))
  }
  //this exposes start to the outside world
  return {
    start,
    handleClick
  }
})();


const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
  Game.start();
})
