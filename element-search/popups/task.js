// Задание 1. Всплывающие окна

let usePopups, newPopup

function switchActivatingPopup(popupID) {
    let popup = usePopups[popupID]
    popup.isActivated = !popup.isActivated
    if (popup.isActivated) {
        popup.popup.className = popup.activating;
        console.log('Активировано Popup id =', popup.popup.id)  // -------------
    } else {
        popup.popup.className = popup.deactivating;
        console.log('Деактивировано Popup id =', popup.popup.id)  // -----------
    }
    return popup;
}

function getTagsByClassName(popup, tagName, className = '') {
    return Array.from(popup.getElementsByTagName(tagName)).filter(
        tag => tag.className.split(' ').find(name => {
            if (className) { return name === className} else {return true}}))
}

function addEventListener(button, popupID, msg = '') {
    button.addEventListener('click', function (event) {
        console.log('Кликнули по кнопке "', this.text, msg, event.target)  // -------------
        switchActivatingPopup(popupID);});
}

function getPopupSurround(popup, activatingClassName = 'modal_active') {
    return {
        popup: popup, isActivated: false,
        activating: popup.className + ' ' + activatingClassName,
        deactivating: popup.className}
}

// 1. В момент запуска скрипта, покажите окно #modal_main
usePopups = {modal_main: getPopupSurround(document.getElementById('modal_main'))}
console.log('Uses new Popup id =', usePopups.modal_main.popup.id);  // ---------------------------
switchActivatingPopup('modal_main');

// 2. Сделайте закрытие активного окна по нажатию на его элемент с классом modal__close
for (let button of getTagsByClassName(usePopups.modal_main.popup, 'a', 'modal__close')) {
    addEventListener(button, 'modal_main', '" с классом "modal__close"');}

// 3. По нажатию на элемент с классом show-success покажите окно #modal_success
usePopups.modal_success = getPopupSurround(document.getElementById('modal_success'))
console.log('Uses new Popup id =', usePopups.modal_success.popup.id);  // ---------------------------
for (let button of getTagsByClassName(usePopups.modal_main.popup, 'a', 'show-success')) {
    addEventListener(button, 'modal_success', '" с классом "show-success"');}

for (let button of getTagsByClassName(usePopups.modal_success.popup, 'a')) {
    addEventListener(button, 'modal_success');}

