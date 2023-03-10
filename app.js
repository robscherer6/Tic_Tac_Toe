const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector('#message').innerHTML = message;
  }
  return {
    renderMessage
  }
})()

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
    getGameBoard
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
    if (gameOver) {
      return;
    }
    let index = parseInt(e.target.id.split('-')[1]);
    //console.log(typeof(index))
    if(Gameboard.getGameBoard()[index] !== "")
    return;

    Gameboard.update(index, players[currentPlayerIndex].symbol)

    if (checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`)
    } else if (checkForTie(Gameboard.getGameBoard())) {
      gameOver = true;
      displayController.renderMessage(`It's a Tie!`)
    };

    //changes index of current player to opposite symbol
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;

  }

  function restart () {
    for (var i = 0; i < 9; i++) {
      Gameboard.update(i, '');
    }
    Gameboard.render();
    gameOver = false;
    document.querySelector('#message').innerHTML = '';
  }

  //this exposes start to the outside world
  return {
    start,
    handleClick,
    restart
  }
})();

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < winningCombinations.length; i++) {
    //destructuring array
    const [a, b, c] = winningCombinations[i];
    //make sure something is in square then check for match
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkForTie (board) {
  return board.every(element => element !== '')
}


const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
  Game.start();
})

const restartButton = document.querySelector('#restartButton');
restartButton.addEventListener('click', () => {
  //console.log('clicked')
  Game.restart();
})


