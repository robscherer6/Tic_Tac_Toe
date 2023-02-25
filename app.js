const Gameboard = (() => {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const render = () => {
    let boardHTML = '';

    gameboard.forEach((square, index) => {
      //create div, add content to div
      boardHTML += `<div class="square" id=square-${index}">${square}</div>`
    })
  }
  document.querySelector('#gameboard').innerHTML = boardHTML;

  return {
    render,
  }
})();

const createPlayer = (name, symbol) => {
  return {
    name,
    mark
  }
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const start = () => {
    players =
  }
})();


const startButton = document.querySelector('#startButton');
startButton.addEventListener('click', () => {
  //Game.start();
})
