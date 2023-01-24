// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// Задание 3. Игра «Убей кротов»

let mainContainer = document.querySelector('main.content');
let holesContainer = mainContainer.querySelector('.hole-game');
let statusesContainer = document.getElementById('status');
let activationClass = 'hole_has-mole'
let deadCounter = document.getElementById('dead');
let lossCounter = document.getElementById('lost');
let gameHandlers = setEventHandlers();

function setEventHandlers() {
    let handlers = {holes: {}};

    let getActiveHole = () => holesContainer.querySelector(`.${activationClass}`);
    let isActiveHole = (holeID) => document.getElementById(holeID).classList.contains(activationClass);

    handlers.holes.click = function (event) {
        if (event.target.classList.contains('hole')) {
            if (isActiveHole(event.target.id)) {
                ++deadCounter.textContent;
            } else {
                ++lossCounter.textContent;
            }
        }
    }

    return handlers;
}

function startHandlers() { holesContainer.addEventListener('click', gameHandlers.click); }

function stopHandlers() { cookieHTML.removeEventListener('click', gameHandlers.click); }


startHandlers();










