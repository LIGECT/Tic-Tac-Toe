const Gameboard = (function () {
  let board = [];

  const initializeBoard = () => {
    board = Array(9).fill(null);
  };

  const getBoard = () => {
    return [...board];
  };

  const setCell = (index, symbol) => {
    if (index >= 0 && index < board.length && board[index] === null) {
      board[index] = symbol;
      return true;
    }
    return false;
  };

  const clearBoard = () => {
    initializeBoard();
  };

  initializeBoard();

  return {
    getBoard,
    setCell,
    clearBoard,
  };
})();

function Player(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;

  return {
    getName,
    getMarker,
  };
}

const GameController = (function () {
  let currentPlayer;
  let players = [];
  let gameStatus = false;
  let gameboard;

  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const init = () => {};
  const playerMove = (index) => {};
  const checkWin = () => {};
  const checkDraw = () => {};
  const resetGame = () => {};
  const getCurrentPlayer = () => {};
  const getWinPlayer = () => {};
  const isGameOver = () => {};

  return {
    init,
    playerMove,
    resetGame,
    getCurrentPlayer,
    getWinPlayer,
    isGameOver,
  };
})();
