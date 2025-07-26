const ScreenController = (function (GameController, Gameboard) {
  const ourGameBoard = document.getElementById("game-board");
  const resetButton = document.getElementById("reset-button");
  const allTheStatusBar = document.getElementById("status-massage");
  const scorePlayerX = document.getElementById("player-x-score");
  const scorePlayerO = document.getElementById("player-o-score");

  const renderBoard = () => {
    ourGameBoard.innerHTML = "";
    const board = Gameboard.getBoard();

    board.forEach((cell, index) => {
      const createCell = document.createElement("button");
      createCell.classList.add("cell");
      createCell.dataset.index = index;

      if (cell) {
        createCell.classList.add(`cell-${cell.toLowerCase()}`);
      }

      createCell.textContent = cell || "";
      createCell.addEventListener("click", () => clickHandler(index));

      ourGameBoard.appendChild(createCell);
    });

    if (GameController.isGameOver()) {
      const winner = GameController.getWinPlayer();

      if (winner) {
        allTheStatusBar.textContent = `${winner.getName()} wins!`;
      } else {
        allTheStatusBar.textContent = "Draw — Nobody survived";
      }
    } else {
      allTheStatusBar.textContent = `Current player ${GameController.getCurrentPlayer().getName()}`;
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

  const init = () => {
    GameController.init();
    renderBoard();
  };

  return {
    init,
  };

  function updateScoreDisplay() {
    const players = GameController.getPlayers();
    scorePlayerX.textContent = `${players[0].getScore()} wins`;
    scorePlayerO.textContent = `${players[1].getScore()} wins`;
  }
})(GameController, Gameboard);

document.addEventListener("DOMContentLoaded", () => {
  ScreenController.init();
});
