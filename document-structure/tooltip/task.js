// Домашнее задание к занятию 2.3 «Изменение структуры HTML-документа».
// Всплывающая подсказка

class Tooltip {
    static classes = {
        hasTooltip: 'has-tooltip',
        tooltip: 'tooltip',
        activation: 'tooltip_active'
    }
    static manager = {
        insertTooltips: () => document.querySelectorAll(`a.${Tooltip.classes.hasTooltip}`)
            .forEach((tagA) => tagA.insertAdjacentHTML(
                'afterend',`<div class=${Tooltip.classes.tooltip}>${tagA.getAttribute('title')}</div>`)
            ),
        deactivateTooltips: () => [...document.querySelectorAll(`div.${Tooltip.classes.tooltip}`)]
            .filter((tooltip) => tooltip.classList.contains(Tooltip.classes.activation))
            .map((tooltip) => {
                tooltip.classList.remove(Tooltip.classes.activation);
                tooltip.style.left = ``;
                tooltip.style.top = ``;
            })
    }

    constructor(element) {
        this.html = element.nextElementSibling;
        this.startLocation = element.getBoundingClientRect();
    };

    switch = () => {
        if (this.html) {
            if (this.html.classList.contains(Tooltip.classes.activation)) {
                Tooltip.manager.deactivateTooltips();
            } else {
                Tooltip.manager.deactivateTooltips();
                this.html.style.left = `${this.startLocation.left}px`;
                this.html.style.top = `${this.startLocation.bottom}px`;
                this.html.classList.add(Tooltip.classes.activation);
            }
        }
    }

}

function setTooltipEventHandlers() {
    let handlers = {}

    handlers.wheel = () => Tooltip.manager.deactivateTooltips();

    handlers.click = (event) => {
        const isElementWithTooltip = event.target.closest(`a.${Tooltip.classes.hasTooltip}`);
        if (!isElementWithTooltip) {
            return; }
        new Tooltip(event.target).switch();
        event.preventDefault();
    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.tooltip = setTooltipEventHandlers();
    return handlers;
}

function startHandlers() {
    document.addEventListener('click', myHandlers.tooltip.click);
    document.addEventListener('wheel', myHandlers.tooltip.wheel);
}

function stopHandlers() {
    document.removeEventListener('click', myHandlers.tooltip.click);
    document.removeEventListener('wheel', myHandlers.tooltip.wheel);
}


Tooltip.manager.insertTooltips();
let myHandlers = setEventHandlers();
startHandlers();
