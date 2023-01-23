// Домашнее задание к занятию 1.3 «Объект события».
// Задание 1. Выпадающие списки

const tabsClasses = {
    containerClass: 'tabs',
    navigation: 'tab__navigation',
    navigationItem: 'tab',
    tabActivation: 'tab_active',
    contents: 'tab__contents',
    contentItem: 'tab__content',
    contentActivation: 'tab__content_active'
}
let myHandlers = setEventHandlers();
let containerID = (id) => document.getElementById(id);
let containerClass = (container, className) => container.querySelector(`.${className}`);

function setTabsEventHandlers() {
    let handlers = {};
    /*
      TODO:
     */
    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.mouse.tabs = setTabsEventHandlers();
    /*
      TODO:
     */
    return handlers;
}

function startHandlers() {
    /*
      TODO:
     */
}

function stopHandlers() {
    /*
      TODO:
     */
}

function start() {
    startHandlers();
    /*
      TODO:
     */
}

function stop() {
    stopHandlers();
    /*
      TODO:
     */
}


start();
