// Домашнее задание к занятию 2.1 «DOM».
// Задание 3. Онлайн-читалка


let myHandlers = setEventHandlers();

function setBooksEventHandlers() {
    let handlers = {};

    handlers.click = (event) => {
        const ctrlContainerClass = 'book__controls',
            fontsContainerClass = 'book__control_font-size',
            activeFontClass = 'font-size_active',
            fontSizeBigClass = 'book_fs-big',
            fontSizeSmallClass = 'book_fs-small';

        const fontSizeCtrl = (event) => {
            const booksContainer = document.getElementById(`book`),
                fontsContainer = booksContainer.querySelector(`.${fontsContainerClass}`),
                activeFont = () => fontsContainer.querySelector(`.${activeFontClass}`);

            activeFont().classList.remove(activeFontClass);
            event.target.classList.add(activeFontClass);

            booksContainer.classList.remove(fontSizeBigClass);
            booksContainer.classList.remove(fontSizeSmallClass);

            if (event.target.className.includes('big')) {
                booksContainer.classList.add(fontSizeBigClass);
            }
            if (event.target.className.includes('small')) {
                booksContainer.classList.add(fontSizeSmallClass);
            }
        }

        const colorCtrl = (event) => {
            /*
              TODO:
             */
        }

        const backgroundCtrl = (event) => {
            /*
              TODO:
             */
        }
                        //    =====================================================

        let isCtrl = event.target.closest(`.${ctrlContainerClass}`);
        if (!isCtrl) {
            return;
        }

        if (event.target.classList.contains('font-size')) {
            fontSizeCtrl(event);
        }
        if (event.target.classList.contains('color')) {
            if (event.target.className.includes('text_color')) {
                colorCtrl(event);
            }
            if (event.target.className.includes('bg_color')) {
                backgroundCtrl(event);
            }
        }

        event.preventDefault();
    };

    return handlers;
}

function setEventHandlers() {
    let handlers = {mouse: {}};
    handlers.mouse.books = setBooksEventHandlers();
    return handlers;
}

function startHandlers() {
    document.addEventListener('click', myHandlers.mouse.books.click);
}

function stopHandlers() {
    document.removeEventListener('click', myHandlers.mouse.books.click);
}

function start() {
    startHandlers();
    /*
      TODO:
     */
}

function stop() {
    stopHandlers();
    /*
      TODO:
     */
}


start();

