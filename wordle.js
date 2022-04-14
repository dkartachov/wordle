let answer = '';
let words = [];
let randomWordApi = 'https://random-word-api.herokuapp.com/word?number=1&length=5';
let nextId = '00';
let guess = '';
let guesses = 0;
let ready = false;
let gameOver = false;

async function fetchWords() {
    while (!answer) {
        let res = await fetch(randomWordApi);
    
        let data = await res.json();
    
        answer = data[0];
    }

    ready = true;
}

document.addEventListener('keydown', (event) => {
    if (!ready) return;
    if (gameOver) return;

    const cell = document.getElementById(nextId);
    const key = event.key;
    
    if (key === 'Enter') {
        if (guess.length < 5) return;

        guesses++;

        if (guesses === 5) {
            gameOver = true;
            console.log(`Answer was: ${answer}`);
        }

        validateGuess(nextId, guess);

        nextId = getNextRow(nextId);
        guess = '';
    }

    if (key === 'Backspace') {
        if (cell.textContent) {
            cell.textContent = '';
        } else {
            nextId = getPrevCol(nextId);
            document.getElementById(nextId).textContent = '';
            
        }

        guess = guess.slice(0, -1);
        bulge(document.getElementById(nextId), 0.8);

        return;
    }

    if (!isLetter(key)) return;

    if (guess.length < 5) {
        guess += key;
        cell.textContent = key.toUpperCase();
        nextId = getNextCol(nextId);
        bulge(cell, 1.1);
    }
});

function bulge(cell, scale) {
    cell.animate([
        { transform: scale ? `scale(${scale})` : 'scale(1)' }
    ], {
        duration: 100
    });
}

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

function lockRow(id) {
    const row = id.charAt(0);

    for (let col = 0; col < 5; col++) {
        document.getElementById(`${row}${col}`).style.transform = 'scale(0.9)';
    }
}

function won(row) {
    row++;

    if (row === 5) return;

    for (let r = row; r < 5; r++) {
        lockRow(`${r}0`);
    }
}

function validateGuess(id, guess) {
    let ans = answer;
    let guessed = 0;
    const row = parseInt(id.charAt(0));

    // loop once for any green letters
    for (let col = 0; col < 5; col++) {
        let letter = guess.charAt(col);
        let cell = document.getElementById(`${row}${col}`);

        if (letter === answer.charAt(col)) {
            cell.style.backgroundColor = 'green';

            guess = setCharAt(guess, col, '-');
            ans = setCharAt(ans, col, '-');

            guessed++;
        }
    }

    if (guessed === 5) {
        gameOver = true;

        won(row);

        return;
    }

    // loop twice for any yellow letters
    for (let col = 0; col < 5; col++) {
        let letter = guess.charAt(col);
        let cell = document.getElementById(`${row}${col}`);

        if (!isLetter(letter)) continue;

        if (ans.includes(letter)) {
            cell.style.backgroundColor = 'orange';

            guess = setCharAt(guess, col, '-');
            ans = setCharAt(ans, ans.indexOf(letter), '-');
        }
    }

    lockRow(id);
}

function setCharAt(string, index, char) {
    return string.substring(0, index) + char + string.substring(index + 1);
}