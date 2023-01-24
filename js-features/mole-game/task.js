// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// Задание 3. Игра «Убей кротов»

let mainContainer = document.querySelector('main.content');
let holesContainer = mainContainer.querySelector('.hole-game');
let statusesContainer = document.getElementById('status');
let gameHandlers = setEventHandlers();

function setEventHandlers() {
    let handlers = {holes: {}};

    handlers.holes.click = function (event) {

    }

    return handlers;
}

function startHandlers() { holesContainer.addEventListener('click', gameHandlers.click, {passive: true}); }

function stopHandlers() { cookieHTML.removeEventListener('click', gameHandlers.click); }


startHandlers();










