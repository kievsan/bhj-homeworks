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

    activate = () => {
        this.html.style.left = `${this.startLocation.left}px`;
        this.html.style.top = `${this.startLocation.bottom}px`;
        this.html.classList.add(Tooltip.classes.activation);
    }
}

function setTooltipEventHandlers() {
    let handlers = {}

    handlers.wheel = () => Tooltip.manager.deactivateTooltips();

    handlers.mousemove = () => Tooltip.manager.deactivateTooltips();

    handlers.click = (event) => {
        Tooltip.manager.deactivateTooltips();

        const isElementWithTooltip = event.target.closest(`a.${Tooltip.classes.hasTooltip}`);
        if (!isElementWithTooltip) {
            return; }

        const tooltip = new Tooltip(event.target);

        if (tooltip.html && !tooltip.html.classList.contains(Tooltip.classes.activation)) {
            tooltip.activate(); }

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
    document.addEventListener('mousemove', myHandlers.tooltip.mousemove);
}

function stopHandlers() {
    document.removeEventListener('click', myHandlers.tooltip.click);
    document.removeEventListener('wheel', myHandlers.tooltip.wheel);
    document.removeEventListener('mousemove', myHandlers.tooltip.mousemove);
}


Tooltip.manager.insertTooltips();
let myHandlers = setEventHandlers();
startHandlers();
