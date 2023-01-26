// Домашнее задание к занятию 2.1 «DOM».
// Задание 1. Появление элементов при прокрутке


function setEventHandlers() {
    let handlers = {};

    handlers.scroll = function (event) {
        for(let hidden of hiddenElements) {
            if (isVisible(hidden)) {
                if (!hidden.classList.contains(activationClass)) {
                    hidden.classList.add(activationClass) }
            } else {
                if (hidden.classList.contains(activationClass)) {
                    hidden.classList.remove(activationClass) }
            }
        }
    }.bind(this);

    return handlers;
}

function isVisible(element) {
    const elementTop = element.getBoundingClientRect().top,
        elementBottom = elementTop + element.getBoundingClientRect().height;
    // console.dir(elementTop, elementBottom);
    return elementTop < window.innerHeight && elementBottom > 0; }

function startHandlers() { document.addEventListener('scroll', myHandlers.scroll) }

function stopHandlers() { document.removeEventListener('scroll', myHandlers.scroll) }


const blockClassName = 'reveal',
    activationClass = 'reveal_active',
    hiddenElements = document.body.querySelectorAll(`.${blockClassName}`),
    myHandlers = setEventHandlers();

startHandlers();
