(function() {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('#status');
    const reset = document.querySelector('#reset');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // event listeners
    let counter = 0;
    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(currentPlayer);
            cell.innerText = currentPlayer; 
            const index = Number(e.target.id);
            board[index] = currentPlayer;
            
            const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
            const currentCombos = [];
            let winner = '';
            winningCombos.forEach(combo => {
                let a = combo[0];
                let b = combo[1];
                let c = combo[2];
                if(board[a] && board[a] == board[b] && board[b] == board[c]) {
                    winner = board[a];
                }
            })
            if (winner == 'X') {
                status.innerText = 'X wins!';
            } else if (winner == 'O') {
                status.innerText = 'O wins!';
            } else {  
                currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
                status.innerText = `${currentPlayer}'s turn`;
            }
            
        })
    });

    reset.addEventListener('click', (e) => {
        for(let i = 0; i < 9; i++) {
            board[i] = '';
            cells.forEach(cell => {
                cell.innerText = '';
            })
            currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
            status.innerText = `${currentPlayer}'s turn`;
        }
    });
})();
