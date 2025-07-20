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
  let score = 0;
  const getName = () => name;
  const getMarker = () => marker;
  const getScore = () => score;
  const addWin = () => {
    score++;
  };

  return {
    getName,
    getMarker,
    getScore,
    addWin,
  };
}

const GameController = (function () {
  let currentPlayer;
  let players = [];
  let gameStatus = false;

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

  let winner = null;

  const init = () => {
    players = [Player("Player X", "X"), Player("Player O", "O")];
    currentPlayer = players[0];
    Gameboard.clearBoard();
    winner = null;
    gameStatus = true;

    console.log(`Game start! Current player ${currentPlayer.getName()}`);
  };

  const playerMove = (index) => {
    if (!gameStatus) {
      console.log("Game is over. Please start a new game.");
      return false;
    }

    if (!Gameboard.setCell(index, currentPlayer.getMarker())) {
      console.log("Cell is already taken.");
      return false;
    }

    if (checkWin()) {
      gameStatus = false;
      winner = currentPlayer;
      winner.addWin();
      console.log(`${winner.getName()} победил!`);
    } else if (checkDraw()) {
      gameStatus = false;
      winner = null;
      console.log("Ничья");
    } else {
      currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
      console.log("Следующий ход:", currentPlayer.getName());
    }

    return true;
  };

  const checkWin = () => {
    const currentBoard = Gameboard.getBoard();

    for (const lines of winnerLines) {
      const [a, b, c] = lines;

      if (
        currentBoard[a] !== null &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return true;
      }
    }
    return false;
  };

  const checkDraw = () => {
    const currentBoard = Gameboard.getBoard();

    const allCellFilled = currentBoard.every((cell) => cell !== null);

    return allCellFilled && !checkWin();
  };

  const resetGame = () => {
    init();
    console.log("Game has been reset.");
  };

  const getCurrentPlayer = () => currentPlayer;
  const getWinPlayer = () => winner;
  const isGameOver = () => !gameStatus;

  return {
    init,
    playerMove,
    resetGame,
    getCurrentPlayer,
    getWinPlayer,
    getPlayers: () => players,
    isGameOver,
    getBoard: Gameboard.getBoard,
  };
})();
