'use strict';
// BHJ-45
// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// 1. Таймер обратного отсчёта


class Timer {
    constructor(startTime = 0, timerID = 'timer') {
        this.timerElement = document.getElementById(timerID);
        this.intervalID = 0;
    }

    setClockTime(newTime) { this.timerElement.textContent = Math.abs(newTime) }
    getClockTime() { return parseInt(this.timerElement.textContent) }

    timerStop = () => {
        clearInterval(this.intervalID);
        this.setClockTime(0);
        alert('Вы победили в конкурсе');
    }

    simpleTimer(startDelay = 4, tickDelay = 2000) {
        let currentDelay = startDelay;
        let start = new Date().getTime();

        this.intervalID = setInterval(() => {
            if (new Date().getTime() - start < currentDelay) {
                currentDelay = tickDelay + start - new Date().getTime();
            } else {
                let time = this.timerElement.textContent--;
                if (!time) {
                    this.timerStop();
                }
                currentDelay = tickDelay;
                start = new Date().getTime();
            }
        }, currentDelay);
    }
}


let timer = new Timer();
timer.simpleTimer();