// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// Задание 2. Игра-кликер

const cookieHTML = document.getElementById('cookie');
const counterHTML = document.getElementById('clicker__counter');
const clickRate = document.getElementById('click__rate');
const maxClickRate = document.getElementById('rating');
let cookieHandlers = setEventHandlers();

function setEventHandlers() {
    let handlers = {};
    let cookieExtending = 20;
    let start = 0;
    let cookieSwitch = () => {
        cookieHTML.width += cookieExtending;
        cookieExtending *= -1;
    }
    let rate;

    handlers.click = function (event) {
        if (start) {
            rate = (1 / (new Date().getTime() - start) * 1000).toFixed(2);
            clickRate.textContent = rate.toString();
            if (rate > parseFloat(maxClickRate.textContent)) {
                maxClickRate.textContent = rate}
        } else {
            start = new Date().getTime();
        }

        cookieSwitch();
        let timeoutID = setTimeout(() => {
            cookieSwitch();
            clearTimeout(timeoutID);
        }, 30);
        ++counterHTML.textContent;
        start = new Date().getTime();
    }

    return handlers;
}

function startHandlers() { cookieHTML.addEventListener('click', cookieHandlers.click, {passive: true}); }

function stopHandlers() { cookieHTML.removeEventListener('click', cookieHandlers.click); }


startHandlers();

