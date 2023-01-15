'use strict';
// BHJ-45
// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// 1. Таймер обратного отсчёта


class Timer {

    #elementValue;

    static clock = {
        isTimeHhMmSc: (clockString) => {
            // TODO
            return clockString;
        },
        backOverTimeHhMmSc: (clockString) => new Date('1970-01-01T' + clockString).getTime(),
        getTimeHhMmSc: (date = new Date()) => date.toLocaleTimeString('ru',
            {hour: "2-digit", minute: "2-digit", second: "2-digit"})
    }

    constructor(elementID = '') {
        this.timer = elementID;
        this.tick = null;
        this.timeRange = null;
        this.stopTime = null;
    }

    set timer (elementID) {
        if (this._element) return;
        let timer = document.getElementById(elementID);
        if (timer) {
            this._element = timer;
            this.#elementValue = timer.textContent;
            this.timeRange = timer.textContent;
            this.tick = null;
        } else {
            console.log(`Таймер не установлен: выбранный элемент с id = "${elementID}" отсутствует в разметке!`);
        }
    }

    get timer () {
        if (!this._element) {console.log(`Таймер не установлен: не выбран элемент разметки!`)}
        return this._element;
    }

    set timeRange (interval) {
        if (interval && this.timer) {
            interval = parseInt(interval);
            if (isNaN(interval) || interval <= 0) interval = 10;
            this._timeRange = interval;
            this.timer.textContent = this._timeRange;
            console.log(`${'Таймер установлен'.toUpperCase()} на элемент разметки с id = "${this.timer.id}" `,
                `и значением "${this.timeRange}"`);
        }
    }

    get timeRange () {return this.timer ? this._timeRange : 0}

    set tick (interval) {
        if (this._element) {
            interval = parseInt(interval);
            if (isNaN(interval) || interval <= 0) interval = 1000;
            this._tick = interval;
            console.log(`${'Шаг Таймера:'.toUpperCase()} "${this._tick}" `);
        }
    }

    get tick () {return this._tick}

    restoreElement () {
        this.timer.textContent = this.#elementValue;
        console.log('Восстановлено исходное значение таймера:');
        this.timeRange = this.#elementValue;
    }

    start (timeRange = this.timeRange,
           timerLife = `Таймер-clock "${this.timer.id}" работал`) {
        if (!this.timer) return;
        const display = this.timer;

        const toConsole = () => console.log(`\t==========  Таймер "${display.id}":  ==========\n`,
            `\t периодичность: 1000 ms,`, ` установлен на`, this.timeRange);
        const displayCountdown  = () => display.textContent =
            display.textContent > 0
                ? (animaID = window.requestAnimationFrame(displayCountdown),
                    Math.ceil((this.stopTime - Date.now()) / 1000))
                : (window.cancelAnimationFrame(animaID), console.timeEnd(timerLife),
                    alert('Вы победили в конкурсе!'), 0);

        this._timeRange = timeRange;
        this.stopTime = Date.now() + this.timeRange * this.tick;
        toConsole();
        console.time(timerLife);
        let animaID = window.requestAnimationFrame(displayCountdown);
        console.log(` Таймер "${display.id}" запущен...`);

    }

    startClock (clockString,
                timerLife = `Таймер-clock "${this.timer.id}" работал`) {
        if (!this.timer) return;

        const display = this.timer;
        const time = (clockString) => Timer.clock.isTimeHhMmSc(clockString)
            ? Timer.clock.backOverTimeHhMmSc(clockString)
            : Timer.clock.backOverTimeHhMmSc('00:00:00');
        const clock = (time) => Timer.clock.getTimeHhMmSc(new Date(time));
        const toConsole = () => console.log(`\t==========  Таймер-clock "${display.id}":  ==========\n`,
            `\t установлен на`, clockString);

        const interval = clockString ? time(clockString) : this.timeRange * this.tick;
        this.timeRange = interval - time();

        const displayCountdown  = (spentTime, currentTime = Date.now() - time()) => display.textContent =
            time(display.textContent) > time()
                ? (animaID = window.requestAnimationFrame(displayCountdown),
                    clock(this.stopTime - currentTime + 1000))
                : (window.cancelAnimationFrame(animaID), console.timeEnd(timerLife), console.log(clockString, spentTime),
                    alert('Вы победили в конкурсе!'), '00:00:00');

        // const displayCountdown  = (spentTime, count = interval - spentTime) => display.textContent =
        //     time(display.textContent) > timeNull
        //         ? (window.requestAnimationFrame(displayCountdown), clock(count + 1000))
        //         : (window.cancelAnimationFrame(anima), console.timeEnd(timerLife), console.log(spentTime),
        //             alert('Вы победили в конкурсе!'), '00:00:00');

        toConsole();
        display.textContent = clockString;

        console.time(timerLife);
        this.stopTime = Date.now() + this.timeRange;

        let animaID = window.requestAnimationFrame(displayCountdown);
        console.log(` Таймер-clock "${display.id}" запущен...`);
    }

    startCountdownCounter(timeRange = this.timeRange, tick = this.tick, timerLife) {
        if (!this.timer) return;
        const display = this.timer;
        if (!timerLife) {timerLife = `Таймер-clock "${display.id}" работал`}
        const toConsole = () => console.log(`\t==========  Таймер "${display.id}":  ==========\n`,
            `\t периодичность: ${this.tick} ms,`, ` установлен на`, this.timeRange);
        const displayCountdown  = (count) => display.textContent =
            count-- > 0
                ? (console.log(`\t${count}: ${Date.now() - startTime}`),
                    setTimeout(() => displayCountdown(count), count ? this.tick : 0),
                    count)
                : (console.timeEnd(timerLife), alert('Вы победили в конкурсе!'), 0);

        this.timeRange = timeRange;
        this.tick = tick;
        const startTime = Date.now();
        this.stopTime = startTime + this.timeRange * this.tick;
        toConsole();
        console.time(timerLife);
        setTimeout(() => displayCountdown(this.timeRange), this.tick);
        console.log(` Таймер "${this.timer.id}" запущен...`);
    }

    startCountdownCounter2(timeRange = this.timeRange, tick = this.tick, timerLife) {
        if (!this.timer) return;
        const display = this.timer;
        if (!timerLife) {timerLife = `Таймер-clock "${display.id}" работал`}
        const toConsole = () => console.log(`\t==========  Таймер "${display.id}":  ==========\n`,
            `\t периодичность: ${tick} ms,`, ` установлен на`, this.timeRange);

        const displayCountdown  = (spentTime) => {
            const count = Math.ceil((this.stopTime - Date.now()) / this.tick);
            return display.textContent =
                count >= 0 && display.textContent > 0
                    ? (display.textContent - count >= 1 ? console.log(`\t${count}: ${spentTime}`) : null,
                        anima = window.requestAnimationFrame(displayCountdown), count)
                    : (console.timeEnd(timerLife), alert('Вы победили в конкурсе!'),
                        window.cancelAnimationFrame(anima), 0);
        }

        this.timeRange = timeRange;
        this.tick = tick;
        const startTime = Date.now();
        this.stopTime = startTime + this.timeRange * this.tick;

        toConsole();
        console.time(timerLife);
        let anima = window.requestAnimationFrame(displayCountdown);
        console.log(` Таймер "${this.timer.id}" запущен...`);
    }

}


// Задача-1:

task1_1_Test();


function task1_1_Test () {
    let myTimer = new Timer();
    myTimer.timeRange = 6;
    myTimer.timer = 'timer';
    myTimer.timeRange = 7;
    myTimer.start(5);

    setTimeout(() => {
        myTimer.restoreElement();
        myTimer.start();
        setTimeout(() => {
            myTimer.startClock('00:00:05');
        }, myTimer.timeRange * 1000 + 2000);
    }, myTimer.timeRange * 1000 + 2000);
}


function startCounter_Test (start) {
    const myTimer = new Timer();
    myTimer.timeRange = 6;
    myTimer.timer = 'timer';
    myTimer.timeRange = 7;
    myTimer[start](5);

    setTimeout(() => {
        myTimer.restoreElement();
        myTimer[start]();
        setTimeout(() => {
            myTimer[start](4, 2000);
            setTimeout(() => {
                myTimer[start]();
            }, myTimer.timeRange * myTimer.tick + 2000);
        }, myTimer.timeRange * myTimer.tick + 2000);
    }, myTimer.timeRange * myTimer.tick + 2000);
}
// startCounter_Test('startCountdownCounter');
// startCounter_Test('startCountdownCounter2');



// Задача-2:






// Задача-1_1: (так, просто варианты...)

// const timerLife = 'Таймер работал';
// const time3Hours = 10800000;
// const nullTime = new Date(-time3Hours);
// const timer = start(displayCountdown);
// const timer1 = start1(timerTicks1);
// const timer2 = start2(timerTicks2);
// const timerSc = start(displayCountdown);

// console.time(timerLife);
// timer('timer');
// timer1('timer', 60000, 1000);
// timer2('timer', 1000, 1000);
// console.log(` Таймер запущен...`);


/**
 * Один тик таймера
 *
 * @param tick периодичность таймера в единицах элемента разметки
 * @param timer элемент разметки, показывающий таймер
 * @returns {boolean}
 */
function timerTicks1 (tick = start1.tick(), timer = start1.timer) {
    return (timer.textContent >= tick
        ? (console.log(timer.textContent), timer.textContent -= tick)
        : 0
        ) >= tick;
}

function start1 (func) {
    /**
     * @param idElement id элемента разметки, показывающего таймер
     * @param timeUnitElement кол-во мс в единице таймера/эл.разметки
     * @param msTickInterval периодичность работы таймера в мс
     * @returns void
     */
    return (idElement, timeUnitElement,  msTickInterval) => {
        start1.timer = document.getElementById(idElement);
        const checkInterval = () =>
            msTickInterval > +start1.timer.textContent * timeUnitElement
                ? +start1.timer.textContent * timeUnitElement
                : +msTickInterval;
        start1.tick = () => checkInterval() / +timeUnitElement;
        console.log(`На таймере-1   ед. = ${timeUnitElement} ms, `,
            `периодичность: ${checkInterval()} ms`);
        console.log(`Таймер-1 установлен на`, start1.timer.textContent);
        let idInterval = setInterval(() => {
            if (!+func()) {
                clearInterval(idInterval);
                idInterval = setTimeout(() => {
                    func();
                    console.timeEnd(timerLife);
                    clearTimeout(idInterval);
                    idInterval = setTimeout(() => {
                        alert('Вы победили в конкурсе!');
                        clearTimeout(idInterval);
                    });
                }, checkInterval());
            }
        }, checkInterval());
    }
}


function timerTicks2 (spentTime, timer = start2.timer) {
    if (timerTicks2.idTimeout) {
        console.log(`\t${timerTicks2.idTimeout}: ${spentTime}`)}
    if (!+timer.textContent) {
        console.timeEnd(timerLife);
        timerTicks2.idTimeout = setTimeout(() => {
            alert('Вы победили в конкурсе!');
            clearTimeout(timerTicks2.idTimeout);
        });
    } else {
        timerTicks2.idTimeout = setTimeout(() => {
            if (timer.textContent >= start2.tick()) {
                timer.textContent -= start2.tick();}
            window.requestAnimationFrame(timerTicks2);
        }, start2.checkInterval());
    }
}

function start2 (func) {
    /**
     * @param idElement id элемента разметки, показывающего таймер
     * @param imeUnitElement кол-во мс в единице таймера/эл.разметки
     * @param msTickInterval периодичность работы таймера в мс
     * @returns void
     */
    return (idElement, timeUnitElement,  msTickInterval) => {
        start2.timer = document.getElementById(idElement);
        start2.checkInterval = () =>
            msTickInterval > +start2.timer.textContent * timeUnitElement
                ? +start2.timer.textContent * timeUnitElement
                : msTickInterval;
        start2.tick = () => start2.checkInterval() / timeUnitElement;
        console.log(`На таймере-2   ед. = ${timeUnitElement} ms, периодичность: ${start2.checkInterval()} ms`);
        console.log(`Таймер-2 установлен на`, start2.timer.textContent);
        window.requestAnimationFrame(func);
    }
}
