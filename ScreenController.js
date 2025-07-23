const ScreenController = (function (gameController, gameboard) {
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
      createCell.addEventListener("click", () => handleClick(index));

      ourGameBoard.appendChild(createCell);
    });
  };
})();
