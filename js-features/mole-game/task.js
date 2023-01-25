// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// Задание 3. Игра «Убей кротов»

const mainContainer = document.querySelector('main.content'),
    holesContainer = mainContainer.querySelector('.hole-game'),
    statusesContainer = document.getElementById('status'),
    holeClassName = 'hole';
    activationClass = 'hole_has-mole',
    deadCounter = document.getElementById('dead'),
    lossCounter = document.getElementById('lost'),
    gameHandlers = setEventHandlers();

function setEventHandlers() {
    let handlers = {holes: {}};
    let getActiveHole = () => holesContainer.querySelector(`.${activationClass}`);
    let isActiveHole = (holeID) => document.getElementById(holeID).classList.contains(activationClass);

    handlers.holes.click = function (event) {
        console.log('Кликнул');
        if (event.target.classList.contains(holeClassName)) {
            console.log('\tпо норке!');
            let action = isActiveHole(event.target.id) ? success : fail;
            action();
        }
    }.bind(this);

    return handlers;
}

function startHandlers() { holesContainer.addEventListener('click', gameHandlers.holes.click), {passive: true}; }

function stopHandlers() { holesContainer.removeEventListener('click', gameHandlers.holes.click); }

function reset() {
    if (!gameHandlers.gameBoard.level) {
        gameHandlers.playing = confirm('ИГРАЕМ?');
    }
    startHandlers();
    deadCounter.textContent = '0';
    lossCounter.textContent = '0';
    return gameHandlers.playing;
}

function success() {
    // ПОПАДАНИЕ
    if (++deadCounter.textContent === 10) {
        stopHandlers();
        win();
        reset();
    }
}

function fail() {
    // ПРОМАХ
    if (++lossCounter.textContent === 5) {
        stopHandlers();
        lose();
        reset();
    }
}

function win() {
    alert(`ПОБЕДА!\nПройден уровень ${gameHandlers.gameBoard.level} \nза ${gameHandlers.gameBoard.time / 1000} сек.`);
    gameHandlers.gameBoard = new GameBoard(++gameHandlers.gameBoard.level);
}

function lose() {
    alert(`ПРОИГРЫШ...\nУровень ${gameHandlers.gameBoard.level}`);
    gameHandlers.gameBoard = new GameBoard(0);
}

class GameBoard {
    static holes = 9;
    static maxMoles = 3;
    static levels = [
        {level: 0, moles: 4, timeout: 30000},
        {level: 1, moles: 3, timeout: 30000},
        {level: 2, moles: 2, timeout: 25000},
        {level: 3, moles: 1, timeout: 20000},
        {level: 4, moles: 1, timeout: 15000}
    ];

    constructor(level) {
        level = parseInt(level);
        level = level ? Math.abs(level) : 0;
        this.level =  level > GameBoard.levels - 1 ? GameBoard.levels.length - 1 : level;
        this.holes = GameBoard.holes;
        this.moles = GameBoard.levels[level].moles;
        this.timeout = GameBoard.levels[level].timeout;
        this.time = 0;
    }

    // putMolesInHoles() {
    matrix() {
        let matrix = new Array(GameBoard.holes);
        for (let hole of matrix) { hole = false }
        for (let m = 1; this.moles; m++) {
            let activeHole;
            do {activeHole = Math.floor( Math.random() * 9 )} while (matrix[activeHole]);
            matrix[activeHole] = true;
        }
        return matrix;
    }
}

function start() {
    gameHandlers.gameBoard = new GameBoard(0);
    if (!reset()) {
        stopHandlers();
        return;
    }
    const getHole = index => document.getElementById(`hole${index}`),
        putMolesInHoles = () => {
            let statuses = gameHandlers.gameBoard.matrix();
            for (let index = 0; gameHandlers.gameBoard.holes; index++) {
                getHole(index).classList.remove(activationClass);
                if (statuses[index]) {
                    getHole(index).classList.add(activationClass); }
            }
        },
        nextHole = (delay) => {
            let delayID = setTimeout(() => {
                if (!gameHandlers.playing) {
                    stopHandlers();
                    clearTimeout(delayID);
                    return; }
                putMolesInHoles();
                clearTimeout(delayID);
                nextHole(800);
            }, delay );
        };

    gameHandlers.startTime = new Date().getTime();
    gameHandlers.stopTime = gameHandlers.startTime + gameHandlers.gameBoard.timeout;

    nextHole(800);
}


start();







