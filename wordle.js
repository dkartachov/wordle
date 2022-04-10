const answer = 'crate';
let nextId = '00';
let guess = '';
let guesses = 0;
let gameOver = false;

document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    const cell = document.getElementById(nextId);
    const key = event.key;
    
    if (key === 'Enter') {
        if (guess.length < 5) return;

        nextId = getNextRow(nextId);
        guess = '';
        guesses++;

        if (guesses === 5) {
            gameOver = true;

            alert('Game over');
            
            return;
        }
    }

    if (key === 'Backspace') {
        if (cell.textContent) {
            cell.textContent = '';
        } else {
            nextId = getPrevCol(nextId);
            document.getElementById(nextId).textContent = '';
        }

        guess = guess.slice(0, -1);
        return;
    }

    if (!isLetter(key)) return;

    guess += guess.length < 5 ? key: '';
    cell.textContent = key.toUpperCase();
    nextId = getNextCol(nextId);

    console.log(guess);
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function getPrevCol(id) {
    let row = parseInt(id.charAt(0));
    let col = parseInt(id.charAt(1));

    if (col > 0) {
        return row + '' + (col - 1);
    }

    return id;
}

function getNextCol(id) {
    let row = parseInt(id.charAt(0));
    let col = parseInt(id.charAt(1));

    if (col < 4) {
        return row + '' + (col + 1);
    }

    return id;
}

function getNextRow(id) {
    let row = parseInt(id.charAt(0));

    if(row < 5) {
        return (row + 1) + '0';
    }
    
    return id;
}