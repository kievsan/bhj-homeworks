'use strict';
// BHJ-45
// Домашнее задание к занятию 1.1 «Возможности JavaScript в браузере».
// 1. Таймер обратного отсчёта


class Timer {
    static clock = {
        secondsToHhMmSc: (sec) => {
            let time = {Hh: 0, Mm: 0, Sc: 0};
            time.Mm = ~~(sec/60);
            time.Ss = `0${sec % 60}`.slice(-2);
            time.Hh = `0${~~(time.Mm/60)}`.slice(-2);
            time.Mm = `0${time.Mm % 60}`.slice(-2);
            return `${time.Hh}:${time.Mm}:${time.Ss}`;
        }
    }

    constructor(timerID = 'timer') {
        this.timerElement = document.getElementById(timerID);
    }

    simpleTime = (time) => Math.abs(parseInt(time));
    advancedTime = (time) => Timer.clock.secondsToHhMmSc(time);

    setClockTime(newTime, isAdvanced = false) {  // Почему таймер скачет то выше, то ниже строчкой не один раз???
        this.timerElement.textContent = isAdvanced ? this.advancedTime(newTime) : newTime;
    }

    getClockTime() { return this.timerElement.textContent }

    timerStop = (intervalID) => {
        clearInterval(intervalID);
        alert('Вы победили в конкурсе');
    }

    startSimpleTimer(startTime = 0, startDelay = 4, tickDelay = 1000) {
        startTime = startTime ? this.simpleTime(startTime) : this.getClockTime();
        this.setClockTime(startTime);
        let currentDelay = startDelay;
        let start = new Date().getTime();

        let intervalID = setInterval(() => {
            if (new Date().getTime() - start < currentDelay) {
                currentDelay = tickDelay + start - new Date().getTime();
            } else {
                if (!this.timerElement.textContent--) {
                    ++this.timerElement.textContent;
                    this.timerStop(intervalID);
                    return;
                }
                currentDelay = tickDelay;
                start = new Date().getTime();
            }
        }, currentDelay);
    }

    startSimpleTimer2(startTime = 0, startDelay = 4, tickDelay = 1000) {
        startTime = startTime ? this.simpleTime(startTime) : this.getClockTime();
        this.setClockTime(startTime);
        let currentDelay = startDelay;
        let intervalID;

        let countdown = function () {
            if (!this.timerElement.textContent--) {
                ++this.timerElement.textContent;
                this.timerStop(intervalID);
                return;
            }
            currentDelay = tickDelay;
            intervalID = setTimeout(countdown, currentDelay);
        }.bind(this);

        countdown();
    }

    startAdvancedTimer(startTime = 0, startDelay = 4, tickDelay = 1000) {
        startTime = startTime ? this.simpleTime(startTime) : this.getClockTime();
        this.setClockTime(startTime, true);
        let currentTime = startTime;
        let currentDelay = startDelay;
        let intervalID;
        
        let countdown = function () {
            let time = currentTime--;
            this.setClockTime(currentTime, true);
            if (!time) {
                this.timerElement.textContent = '00:00:00';
                this.timerStop(intervalID);
                return;
            }
            currentDelay = tickDelay;
            intervalID = setTimeout(countdown, currentDelay);
        }.bind(this);

        countdown();
    }
}


let timer = new Timer();
// timer.startSimpleTimer();
// timer.startSimpleTimer2(100);
// timer.startAdvancedTimer(66);
timer.startAdvancedTimer();
