// Домашнее задание к занятию 2.3 «Изменение структуры HTML-документа».
// Всплывающая подсказка.

let myHandlers = setEventHandlers();

function setTooltipEventHandlers() {
    let handlers = {currentMassage: ''};

    handlers.click = (event) => {
        const isElementWithTooltip = event.target.closest(`a.has-tooltip`);
        if (!isElementWithTooltip) {
            return; }

        

        event.preventDefault();
    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.tooltip = setTooltipEventHandlers();
    return handlers;
}

function startHandlers() { document.addEventListener('click', myHandlers.tooltip.click); }

function stopHandlers() { document.removeEventListener('click', myHandlers.tooltip.click); }


startHandlers();






