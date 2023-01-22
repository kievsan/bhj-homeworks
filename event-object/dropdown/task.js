// Домашнее задание к занятию 1.3 «Объект события».
// Задание 1. Выпадающие списки

const dropdownSet = {
    containerClass: 'dropdown',
    valueClass: 'dropdown__value',
    className: 'dropdown__list',
    activation: 'dropdown__list_active',
    itemClass: 'dropdown__item'
}

let myDropdownContainer = document.querySelector(`body>main`);
let handlers = {mouse: setEventHandlers(myDropdownContainer)};

// let getDropdown = (target) => target.closest(dropdownSet.).querySelector(`.${dropdownSet.className}`);
let getDropdownList = (dropdown) => dropdown.querySelector(`.${dropdownSet.className}`);
let getDropdownValue = (dropdown) => dropdown.querySelector(`.${dropdownSet.valueClass}`);

// все dropdown в нужном родительском контейнере
let getDropdownsAround = (container) => container.querySelectorAll(`div.${dropdownSet.containerClass}`);

function setEventHandlers(myContainer) {
    let handlers = {};
    let deactivateDropdownsFrom = function (target, container) {
        for (let dropdown of getDropdownsAround(container)) {
            if (!getDropdownValue(dropdown).contains(target)) {
                if (getDropdownList(dropdown).className.includes(dropdownSet.activation)) {
                    getDropdownList(dropdown).classList.remove(dropdownSet.activation); }}}
    }
    let activateDropdown = function (event, container) {
        let currentDropdown;
        for (let dropdown of getDropdownsAround(container)) {
            if (dropdown.contains(event.target)) {
                currentDropdown = dropdown;
                break; }}
        if (currentDropdown && getDropdownValue(currentDropdown).contains(event.target)) {
            getDropdownList(currentDropdown).classList.add(dropdownSet.activation); }
    }

    handlers.clickDropdownHandler = function (event) {
        // deactivateDropdownsFrom(event.target, myContainer);
        if (event.target.className.includes(dropdownSet.valueClass)) {
            activateDropdown(event, myContainer); }
    }.bind(this);

    handlers.clickDropdownItemHandler = function (event) {
        let item = event.target.closest(`a.${dropdownSet.itemClass}`);
        if (item && item.className.includes(dropdownSet.itemClass))  {
            event.preventDefault();       // блокировать действие браузера по умолчанию
            console.log(event.target.className);
            item.textContent = event.target.textContent; }
    }.bind(this);

    handlers.clickAnyHandler = function (event) {
        deactivateDropdownsFrom(event.target, myContainer);
    }.bind(this);

    return handlers;
}

function start(ctrlEvent = 'click', ) {
    myDropdownContainer.addEventListener(ctrlEvent, handlers.mouse.clickDropdownHandler);
    myDropdownContainer.addEventListener(ctrlEvent, handlers.mouse.clickDropdownItemHandler);
    document.addEventListener(ctrlEvent, handlers.mouse.clickAnyHandler);
}

function stop(ctrlEvent = 'click', ) {
    myDropdownContainer.removeEventListener(ctrlEvent, handlers.mouse.clickDropdownHandler);
    myDropdownContainer.removeEventListener(ctrlEvent, handlers.mouse.clickDropdownItemHandler);
    document.removeEventListener(ctrlEvent, handlers.mouse.clickAnyHandler);
}

start();
