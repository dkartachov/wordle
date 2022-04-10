const data = {
    r0: ['', '', '', '', ''],
    r1: ['', '', '', '', ''],
    r2: ['', '', '', '', ''],
    r3: ['', '', '', '', ''],
    r4: ['', '', '', '', '']
};

const validKeys = ['']

let nextId = 'r0c0';

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isLetter(key)) return;

    document.getElementById(nextId).textContent = key;

    nextId = getNextId(nextId);
});

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function getNextId(id) {
    let colId = id.substring(2);
    let colNum = parseInt(colId.charAt(1));

    if (colNum < 4) {
        colNum++;
        return id.replace(colId, `c${colNum}`);
    }

    return id;
}