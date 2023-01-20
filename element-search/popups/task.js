// Домашнее задание к занятию 1.2 «Способы поиска нужного HTML-элемента».
// Задание 1. Всплывающие окна

let activatingClassName = 'modal_active';

// 1. В момент запуска скрипта, покажите окно #modal_main
document.getElementById('modal_main').classList.add(activatingClassName);

// 2. Сделайте закрытие активного окна по нажатию на его элемент с классом modal__close
for (let button of document.querySelectorAll('.modal__close')) {
    button.addEventListener('click', (event) => {
        let popup = button.closest('div.modal');
        if (popup.className.includes(activatingClassName)) {
            popup.classList.remove(activatingClassName); }
    });
}

// 3. По нажатию на элемент с классом show-success покажите окно #modal_success
for (let button of document.querySelectorAll('.show-success')) {
    button.addEventListener('click', (event) => {
        let popup = document.querySelector('#modal_success');
        if (!popup.className.includes(activatingClassName)) {
            popup.classList.add(activatingClassName); }
    });
}
