// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// Задание 3. Игра «Убей кротов»


function setEventHandlers() {
    let handlers = {};
    let isActiveHole = (holeID) => document.getElementById(holeID).classList.contains(activationClass);

    handlers.click = function (event) {
        if (event.target.classList.contains(holeClassName)) {
            let action = isActiveHole(event.target.id) ? success : fail;
            action();
        }
    }.bind(this);

    return handlers;
}

function startHandlers() { holesContainer.addEventListener('click', gameHandlers.click) }

function stopHandlers() { holesContainer.removeEventListener('click', gameHandlers.click) }

function reset() {
    gameHandlers.playing = confirm('ИГРАЕМ?');
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
    alert(`ПОБЕДА!`);
}

function lose() {
    alert(`ПРОИГРЫШ...`);
}

function start() {
    if (!reset()) {
        stopHandlers(); }
}

const mainContainer = document.querySelector('main.content'),
    holesContainer = mainContainer.querySelector('.hole-game'),
    holeClassName = 'hole',
    activationClass = 'hole_has-mole',
    deadCounter = document.getElementById('dead'),
    lossCounter = document.getElementById('lost'),
    gameHandlers = setEventHandlers();

start();







