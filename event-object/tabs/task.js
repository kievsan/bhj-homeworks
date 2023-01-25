// Домашнее задание к занятию 1.3 «Объект события».
// Задание 1. Выпадающие списки

const tabsClasses = {
    containerClass: 'tabs',
    navigation: 'tab__navigation',
    tab: 'tab',
    tabActivation: 'tab_active',
    contents: 'tab__contents',
    content: 'tab__content',
    contentActivation: 'tab__content_active'
}
let myHandlers = setEventHandlers();
let containerID = (id) => document.getElementById(id);
let containerClass = (container, className) => container.querySelector(`.${className}`);

function setTabsEventHandlers() {
    let handlers = {};

    handlers.click = (event) => {
        let container = event.target.closest(`.${tabsClasses.containerClass}`);
        let navigation = event.target.closest(`.${tabsClasses.navigation}`);
        let tabs = navigation.querySelectorAll(`.${tabsClasses.tab}`);
        let contents = container.querySelector(`.${tabsClasses.contents}`);
        let texts = contents.querySelectorAll(`.${tabsClasses.content}`);
        let activeTab = () => {
            for (let tab of tabs) {
                if (tab.className.includes(tabsClasses.tabActivation)) { return tab } }
            console.log('Ошибка: нет активного TAB!', tabs);
            return undefined;
        }
        let activeText = () => {
            for (let text of texts) {
                if (text.className.includes(tabsClasses.contentActivation)) { return text } }
            console.log('Ошибка: нет активного TEXT!', texts);
            return undefined;
        }
        let activateContent = () => {
            if (!event.target.className.includes(tabsClasses.tabActivation)) {
                event.target.classList.add(tabsClasses.tabActivation);
            }
            let index = [...tabs].indexOf(event.target);
            if (!texts[index].className.includes(tabsClasses.contentActivation)) {
                texts[index].classList.add(tabsClasses.contentActivation); }
        }
        let deactivateContent = () => {
            if (activeTab()?.className.includes(tabsClasses.tabActivation)) {
                activeTab()?.classList.remove(tabsClasses.tabActivation);
            }
            if (activeText()?.className.includes(tabsClasses.contentActivation)) {
                activeText()?.classList.remove(tabsClasses.contentActivation); }
        }

        deactivateContent();
        activateContent();
    };

    return handlers;
}

function setEventHandlers() {
    let handlers = {mouse: {}};
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
