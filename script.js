const Gameboard = function () {
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
};
