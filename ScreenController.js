const ScreenController = (function (GameController, Gameboard) {
  const ourGameBoard = document.getElementById("game-board");
  const mainResetButton = document.getElementById("reset-button");
  const allTheStatusBar = document.getElementById("status-massage");

  const renderBoard = () => {
    ourGameBoard.innerHTML = "";
    const board = Gameboard.clearBoard();

    board.forEach((cell, index) => {
      const createCell = document.createElement("button");
      createCell.classList.add("cell");
      createCell.dataset.index = index;

      createCell.textContent = cell || "";
      createCell.addEventListener("click", () => clickHandler(index));

      ourGameBoard.appendChild(createCell);
    });

    if (GameController.isGameOver()) {
      const winner = GameController.getWinPlayer();

      if (winner) {
        allTheStatusBar.textContent = `${winner.getName()} Победитель!`;
      } else {
        allTheStatusBar.textContent = "Ничья";
      }
    } else {
      allTheStatusBar.textContent = `Текущий игрок ${GameController.getCurrentPlayer().getName()}`;
    }
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
})();
