// Variables to manage the game state
let board = ['', '', '', '', '', '', '', '', '']; // 3x3 grid represented as a flat array
let currentPlayer = 'X';
let gameActive = true;

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// Winning combinations (indices of the board array)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal wins
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical wins
    [0, 4, 8], [2, 4, 6]             // diagonal wins
];

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    // If the cell is already taken or the game is over, return
    if (board[index] !== '' || !gameActive) {
        return;
    }

    // Update the board with the current player's move
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check if the current player has won
    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check for a draw (if no empty cells left)
    if (!board.includes('')) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to check for a winner
function checkWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = '');
}

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add event listener to reset button
resetButton.addEventListener('click', resetGame);
