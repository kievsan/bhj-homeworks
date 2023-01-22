// Домашнее задание к занятию 1.3 «Объект события».
// Задание 1. Выпадающие списки

const dropdownSet = {
    containerClass: 'dropdown',
    valueClass: 'dropdown__value',
    className: 'dropdown__list',
    activation: 'dropdown__list_active',
    itemClass: 'dropdown__item'
}

let myDropdownContainer = document.querySelector(`body>main.content`);
let handlers = {mouse: setEventHandlers(myDropdownContainer)};

let getDropdownList = (dropdown) => dropdown.querySelector(`.${dropdownSet.className}`);
let getDropdownValue = (dropdown) => dropdown.querySelector(`.${dropdownSet.valueClass}`);

// все dropdown в нужном родительском контейнере
let getDropdownsAround = (container) => container.querySelectorAll(`div.${dropdownSet.containerClass}`);

/**
 * Задаёт обработчики событий в конкретном контейнере
 * @param myContainer: контейнер для целей событий
 * @returns {{}} объект с обработчиками событий
 */
function setEventHandlers(myContainer) {
    let handlers = {};
    let deactivateDropdowns = function (container, target) {
        for (let dropdown of getDropdownsAround(container)) {
            if (!getDropdownValue(dropdown).contains(target)) {
                if (getDropdownList(dropdown).className.includes(dropdownSet.activation)) {
                    getDropdownList(dropdown).classList.remove(dropdownSet.activation); }}}
    }
    let activateDropdown = function (container, event) {
        let currentDropdown;
        for (let dropdown of getDropdownsAround(container)) {
            if (dropdown.contains(event.target)) {
                currentDropdown = dropdown;
                break; }}
        if (currentDropdown && getDropdownValue(currentDropdown).contains(event.target)) {
            getDropdownList(currentDropdown).classList.add(dropdownSet.activation); }
    }

    handlers.clickDropdownHandler = function (event) {
        let value = event.target;
        if (value.tagName !== 'DIV' && !value.className.includes(dropdownSet.valueClass)) { return }
        activateDropdown(myContainer, event);
    }

    handlers.clickDropdownItemHandler = function (event) {
        let item = event.target;
        if (item.tagName !== 'A' && !item.className.includes(dropdownSet.itemClass)) { return }
        let myDropdown = item.closest(`div.${dropdownSet.containerClass}`);
        getDropdownValue(myDropdown).textContent = item.textContent;
        event.preventDefault();      // блокировать действие браузера по умолчанию
    }

    handlers.clickAnyHandler = function (event) {
        deactivateDropdowns(myContainer, event.target);
    }

    return handlers;
}

function start(ctrlEvent = 'click', ) {
    myDropdownContainer.addEventListener(ctrlEvent, handlers.mouse.clickDropdownHandler);
    myDropdownContainer.addEventListener(ctrlEvent, handlers.mouse.clickDropdownItemHandler);
    document.addEventListener(ctrlEvent, handlers.mouse.clickAnyHandler, {passive: true});
}

function stop(ctrlEvent = 'click', ) {
    myDropdownContainer.removeEventListener(ctrlEvent, handlers.mouse.clickDropdownHandler);
    myDropdownContainer.removeEventListener(ctrlEvent, handlers.mouse.clickDropdownItemHandler);
    document.removeEventListener(ctrlEvent, handlers.mouse.clickAnyHandler);
}

start();
