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

    handlers.click = function (event) {
        let container = event.target.closest(`.${tabsClasses.containerClass}`);
        let navigation = event.target.closest(`.${tabsClasses.navigation}`);
        let tabs = navigation.querySelectorAll(`.${tabsClasses.navigationItem}`);
        let contents = container.querySelector(`.${tabsClasses.contents}`);
        let texts = contents.querySelectorAll(`.${tabsClasses.contentItem}`);
        let activeTab = () => tabs.querySelector(`.${tabsClasses.tabActivation}`);
        let activeText = () => texts.querySelector(`.${tabsClasses.contentActivation}`);
        let activateContent = () => {
            if (!event.target.className.includes(tabsClasses.tabActivation)) {
                event.target.classList.add(tabsClasses.tabActivation);
            }
            let index = [...tabs].indexOf(event.target);
            if (!texts[index].className.includes(tabsClasses.contentActivation)) {
                texts[index].classList.add(tabsClasses.contentActivation); }
        }
        let deactivateContent = () => {
            if (activeTab().className.includes(tabsClasses.tabActivation)) {
                activeTab().classList.remove(tabsClasses.tabActivation);
            }
            if (activeText().className.includes(tabsClasses.contentActivation)) {
                activeText().classList.remove(tabsClasses.contentActivation); }
        }

        deactivateContent();
        activateContent();
    }.bind(this);

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.mouse.tabs = setTabsEventHandlers();
    return handlers;
}

function startHandlers() {
    document.addEventListener('click', myHandlers.mouse.tabs.click, {passive: true});
}

function stopHandlers() {
    document.removeEventListener('click', myHandlers.mouse.tabs.click);
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
