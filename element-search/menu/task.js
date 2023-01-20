// Домашнее задание к занятию 1.2 «Способы поиска нужного HTML-элемента».
// Задание 2. Навигационное меню.

let activatedSubMenu;
let mainMenu = document.querySelector('ul.menu_main');
let activation = 'menu_active';

let getMenuItems = (menu) => menu.querySelectorAll('li.menu__item a.menu__link');
let getSubmenu = (menu) => menu.parentNode.querySelector('ul.menu_sub');

function activateSubMenu(menu) {
    if (getSubmenu(menu) === activatedSubMenu) {
        deactivateSubMenu();
    } else {
        deactivateSubMenu();
        activatedSubMenu = getSubmenu(menu);
        activatedSubMenu.classList.add((activation));
    }
}

function deactivateSubMenu() {
    if (activatedSubMenu) {
        activatedSubMenu.classList.remove((activation)); }
    activatedSubMenu = null;
}

function setEventHandlers(menu, ctrlEvent = 'click') {
    let menuItemHandler = (event) => deactivateSubMenu();
    let submenuItemHandler = (event) => {
        activateSubMenu(event.target);   // активировать подменю
        event.preventDefault();         // блокировать действие браузера по умолчанию
    }
    for (let menu_item of getMenuItems(mainMenu)) {
        if (getSubmenu(menu_item)) {
            menu_item.addEventListener(ctrlEvent, submenuItemHandler);
        } else {
            menu_item.addEventListener(ctrlEvent, menuItemHandler); }
    }
}


setEventHandlers(mainMenu);
