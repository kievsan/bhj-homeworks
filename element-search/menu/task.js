// Задание 2. Навигационное меню.

let mainMenu, activatedMenu;

mainMenu = document.querySelector('ul.menu_main');

function getMenuItems(menu) {
    return menu.querySelectorAll('li.menu__item a.menu__link');
}

function getSubmenu(menu) {
    return menu.parentNode.querySelector('ul.menu_sub');
}

function setEventHandlers(menu, ctrlEvent = 'click', activation = 'menu_active') {
    let printMsg = (targetText) => console.log('Кликнули по "', targetText, '"');
    let menuItemHandler = (event) => printMsg(event.target.text);
    let submenuItemHandler = (event) => {
        printMsg(event.target.text);
        getSubmenu(event.target).classList.add(activation); // активировать подменю (submenu.className += '' + activate)
        return false; // блокировать действие браузера по умолчанию
    }
    for (let menu_item of getMenuItems(mainMenu)) {
        if (getSubmenu(menu_item)) {
            menu_item.addEventListener(ctrlEvent, submenuItemHandler);
        } else {
            menu_item.addEventListener(ctrlEvent, menuItemHandler);}
    }
}


setEventHandlers(mainMenu)
