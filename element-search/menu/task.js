// Домашнее задание к занятию 1.2 «Способы поиска нужного HTML-элемента».
// Задание 2. Навигационное меню.

let activatedSubMenu;
let activation = 'menu_active';
let subMenuClass = 'menu_sub';
let mainMenuSelector = 'ul.menu_main';
let mainMenu = document.querySelector(mainMenuSelector);

let getMenuItems = (menu) => menu.querySelectorAll('li.menu__item a.menu__link');
let getSubmenu = (menu) => menu.parentNode.querySelector(`ul.${subMenuClass}`);
let getActiveSubmenus = (menu = mainMenu) => menu.querySelectorAll(`.${activation}`);

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
        activatedSubMenu.classList.remove((activation));
        activatedSubMenu = null; }
}

function setEventHandlers(menu, ctrlEvent = 'click') {
    let menuItemHandler = () => deactivateSubMenu();
    let submenuItemHandler = (event) => {
        activateSubMenu(event.target);   // активировать подменю
        event.preventDefault();         // блокировать действие браузера по умолчанию
    }
    let deactivateSubMenus = (event) => {
        if (!activatedSubMenu || event.target.closest(mainMenuSelector)) {
            return }  // Нет активного субменю, кликнутая цель не принадлежит меню
        activatedSubMenu = null;
        for (let subMenu of getActiveSubmenus()) {
            subMenu.classList.remove((activation)); }  // деактивация всех активных подменю
    }
    for (let menu_item of getMenuItems(mainMenu)) {
        if (getSubmenu(menu_item)) {
            menu_item.addEventListener(ctrlEvent, submenuItemHandler);
        } else {
            menu_item.addEventListener(ctrlEvent, menuItemHandler); }
    }
    document.addEventListener(ctrlEvent, deactivateSubMenus);
}


setEventHandlers(mainMenu);
