// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// Задание 2. Игра-кликер

const cookieHTML = document.getElementById('cookie');
const counterHTML = document.getElementById('clicker__counter');
let cookieHandlers = setEventHandlers();

function setEventHandlers() {
    let handlers = {};
    let cookieExtending = 20;

    handlers.click = function (event) {
        let cookieSwitch = () => {
            cookieHTML.width += cookieExtending;
            cookieExtending *= -1;
        }
        cookieSwitch();
        let timeoutID = setTimeout(() => {
            cookieSwitch();
            clearTimeout(timeoutID);
        }, 100);
        ++counterHTML.textContent;
    }

    return handlers;
}

function startHandlers() { cookieHTML.addEventListener('click', cookieHandlers.click, {passive: true}); }

function stopHandlers() { cookieHTML.removeEventListener('click', cookieHandlers.click); }


startHandlers();

