const ScreenController = (function (GameController, Gameboard) {
  const gameBoardElement = document.getElementById("game-board");
  const resetButton = document.getElementById("reset-button");
  const statusMessageElement = document.getElementById("status-massage");
  const scorePlayerX = document.getElementById("player-x-score");
  const scorePlayerO = document.getElementById("player-o-score");
  const playerXNameElement = document.getElementById("player-x-name");
  const playerONameElement = document.getElementById("player-o-name");
  const gameContainer = document.getElementById("game-container");

  const startModal = document.getElementById("start-modal");
  const inputPlayer1 = document.getElementById("player1-name");
  const inputPlayer2 = document.getElementById("player2-name");
  const startGameButton = document.getElementById("start-game-button");

  const renderBoard = () => {
    gameBoardElement.innerHTML = "";
    const board = Gameboard.getBoard();
    const victoryLine = GameController.getVictoryLine();

    board.forEach((cell, index) => {
      const createCell = document.createElement("button");
      createCell.classList.add("cell");
      createCell.dataset.index = index;

      if (cell) {
        createCell.classList.add(`cell-${cell.toLowerCase()}`);
      }

      if (victoryLine && victoryLine.includes(index)) {
        createCell.classList.add("winning-cell");
      }

      createCell.textContent = cell || "";
      createCell.addEventListener("click", () => clickHandler(index));

      gameBoardElement.appendChild(createCell);
    });

    if (GameController.isGameOver()) {
      const winner = GameController.getWinPlayer();

      if (winner) {
        statusMessageElement.textContent = `${winner.getName()} wins!`;
      } else {
        statusMessageElement.textContent = "Draw — Nobody survived";
      }
    } else {
      statusMessageElement.textContent = `Current player: ${GameController.getCurrentPlayer().getName()}`;
    }
    updateScoreDisplay();
  };

  const clickHandler = (index) => {
    if (GameController.isGameOver()) {
      console.log("game over go again ");
      return;
    }

    if (GameController.playerMove(index)) {
      renderBoard();
    }
  };

  resetButton.addEventListener("click", () => {
    GameController.resetGame();
    renderBoard();
  });

  startGameButton.addEventListener("click", () => {
    const player1Name = inputPlayer1.value;
    const player2Name = inputPlayer2.value;

    GameController.init(player1Name, player2Name);

    startModal.classList.add("hidden");
    gameContainer.classList.remove("hidden");

    updatePlayerName();
    renderBoard();
  });

  const init = () => {};

  return {
    init,
  };

  function updateScoreDisplay() {
    const players = GameController.getPlayers();
    scorePlayerX.textContent = `${players[0].getScore()} wins`;
    scorePlayerO.textContent = `${players[1].getScore()} wins`;
  }

  function updatePlayerName() {
    const players = GameController.getPlayers();

    playerXNameElement.textContent = players[0].getName();
    playerONameElement.textContent = players[1].getName();
  }
})(GameController, Gameboard);

document.addEventListener("DOMContentLoaded", () => {
  ScreenController.init();
});
