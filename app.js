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

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, '');
    }
    render();
  }

  const update = (index, value) => {
    gameboard[index] = value;
    render();
  };

  //returns the gameboard (array) indirectly so we cannot modify it
  const getGameBoard = () => gameboard;

  //this return exposes functions to the outside world
  return {
    render,
    update,
    getGameBoard,
    restart
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
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', handleClick);
    })
  }

  const handleClick = (e) => {
    let index = parseInt(e.target.id.split('-')[1]);
    //console.log(typeof(index))
    if(Gameboard.getGameBoard()[index] !== "")
    return;

    Gameboard.update(index, players[currentPlayerIndex].symbol)
    //changes index of current player to opposite symbol
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

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

const restartButton = document.querySelector('#restartButton');
restartButton.addEventListener('click', () => {
  //console.log('clicked')
  Gameboard.restart();
})


