// BHJ-45
// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// 1. Таймер обратного отсчёта


function decorator(func, ms) {
    return (...args) => {decorator.intervalID = setInterval(() => {
        if (!+func.call(this, ...args, ms / 1000)) {
            if (ms) {
                console.timeEnd(timer.duration);
                ms = 0;
            } else {
                clearInterval(decorator.intervalID);
                alert('Вы победили в конкурсе!')}
            }
        }, ms);
    }
}

const timerTicks = (id, tick, timer = document.getElementById(id)) =>
    timer.textContent < tick ? timer.textContent = 0 : timer.textContent -= tick;
let timer = decorator(timerTicks, 1000);
console.time(timer.duration = 'Таймер работал');
timer('timer');
console.log(`Таймер запущен...`);
