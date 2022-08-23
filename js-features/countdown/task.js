// BHJ-45
// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// 1. Таймер обратного отсчёта


// let timer = decor(timerTicks);
let timer = decor2(timerTicks2);
console.time(timerLife = 'Таймер работал');
timer('timer', 1000, 1000);
console.log(` Таймер запущен...`);


/**
 * Один тик таймера
 *
 * @param tick периодичность таймера в единицах элемента разметки
 * @param timer элемент разметки, показывающий таймер
 * @returns {boolean}
 */
const timerTicks = (tick = decor.tick(), timer = decor.timer) =>
    (timer.textContent >= tick ? timer.textContent -= tick : 0) >= tick;

function decor(func) {
    /**
     * @param idElement id элемента разметки, показывающего таймер
     * @param imeUnitElement кол-во мс в единице таймера/эл.разметки
     * @param msTickInterval периодичность работы таймера в мс
     * @returns void
     */
    return (idElement, timeUnitElement,  msTickInterval) => {
        decor.timer = document.getElementById(idElement);
        const checkInterval = () =>
            msTickInterval > +decor.timer.textContent * timeUnitElement
                ? +decor.timer.textContent * timeUnitElement
                : +msTickInterval;
        decor.tick = () => checkInterval() / +timeUnitElement;
        let idInterval;
        console.log(`На таймере 1 ед. = ${timeUnitElement} ms, `,
            `периодичность: ${checkInterval()} ms`);
        console.log(`Таймер установлен на`, decor.timer.textContent);
        idInterval = setInterval(() => {
            if (!+func()) {
                clearInterval(idInterval);
                idInterval = setTimeout(() => {
                    func();
                    console.timeEnd(timerLife);
                    clearTimeout(idInterval);
                    idInterval = setTimeout(() => {
                        alert('Вы победили в конкурсе!');
                    }, 0);
                }, checkInterval());
            }
        }, checkInterval());
    }
}


function timerTicks2 (spentTime, timer = decor2.timer) {
    if (timerTicks2.idTimeout) {
        console.log(`\t${timerTicks2.idTimeout}: ${spentTime}`)}
    if (!+timer.textContent) {
        console.timeEnd(timerLife);
        timerTicks2.idTimeout = setTimeout(() => {
            alert('Вы победили в конкурсе!');
        }, 0);
        clearTimeout(timerTicks2.idTimeout);
    } else {
        timerTicks2.idTimeout = setTimeout(() => {
            if (timer.textContent >= decor2.tick()) {
                timer.textContent -= decor2.tick();}
            window.requestAnimationFrame(timerTicks2);
        }, decor2.checkInterval());
    }
}

function decor2(func) {
    /**
     * @param idElement id элемента разметки, показывающего таймер
     * @param imeUnitElement кол-во мс в единице таймера/эл.разметки
     * @param msTickInterval периодичность работы таймера в мс
     * @returns void
     */
    return (idElement, timeUnitElement,  msTickInterval) => {
        decor2.timer = document.getElementById(idElement);
        decor2.checkInterval = () =>
            msTickInterval > +decor2.timer.textContent * timeUnitElement
                ? +decor2.timer.textContent * timeUnitElement
                : msTickInterval;
        decor2.tick = () => decor2.checkInterval() / timeUnitElement;
        console.log(`На таймере-2 1 ед. = ${timeUnitElement} ms, периодичность: ${decor2.checkInterval()} ms`);
        console.log(`Таймер-2 установлен на`, decor2.timer.textContent);
        window.requestAnimationFrame(func);
    }
}


// let end;
// const now = Date.now;
// const timer = document.getElementById("timer");
// const duration = timer.textContent * 1000;
//
// function displayCountdown() {
//     const count = parseInt((end - now()) / 100);
//     timer.textContent =
//         count > 0 ? (window.requestAnimationFrame(displayCountdown), count) : 0;
// }
//
// function start() {
//     end = now() + duration;
//     window.requestAnimationFrame(displayCountdown);
// }
//
// start();