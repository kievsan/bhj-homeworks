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
// let myDropdown = myDropdownContainer.querySelector(`div.card>div.${dropdownSet.containerClass}:first-child`);

// все dropdown в нужном родительском контейнере для моего dropdown
let getDropdownsAround = (container) => container.querySelectorAll(`div.${dropdownSet.containerClass}`);

function setEventHandlers(ctrlEvent = 'click', myContainer = myDropdownContainer) {
    let deactivateDropdownsFrom = function (container) {
        for (let dropdown of getDropdownsAround(container)) {
            if (dropdown.className.includes(dropdownSet.activation)) {
                dropdown.classList.remove(dropdownSet.activation); }}
    }
    let activateDropdown = function (event, container) {
        let currentDropdown;
        for (let dropdown of getDropdownsAround(container)) {
            if (dropdown.contains(event.target)) {
                currentDropdown = dropdown;
                break; }}
        if (!currentDropdown) {
            return }
        let dropdownList = currentDropdown.querySelector(`.${dropdownSet.className}`);
        let dropdownValue = currentDropdown.querySelector(`.${dropdownSet.valueClass}`);
        if (dropdownValue.contains(event.target)) {
            dropdownList.classList.add(dropdownSet.activation);
            if (dropdownList.contains(event.target)) {
                dropdownValue.textContent = event.target.textContent;
            }
        }

    }

    let mouseClickDropdownHandler = function (event) {
        deactivateDropdownsFrom(myContainer);
        activateDropdown(event, myContainer);
    }.bind(this);

    myContainer.addEventListener(ctrlEvent, mouseClickDropdownHandler);
}

setEventHandlers()
