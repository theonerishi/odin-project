(function() {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('#status');
    const reset = document.querySelector('#reset');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    reset.addEventListener('click', resetGame);

    function handleCellClick(e) {
        // game logic here
    }

    function resetGame() {
        // reset logic here
    }
})();
