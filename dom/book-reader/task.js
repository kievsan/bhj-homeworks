// Домашнее задание к занятию 2.1 «DOM».
// Задание 3. Онлайн-читалка


let myHandlers = setEventHandlers();

function setBooksEventHandlers() {
    let handlers = {};
    
    const booksContainer = document.getElementById(`book`);

    const fontsContainerClass = 'book__control_font-size',
        activeFontClass = 'font-size_active',
        fontSizeBigClass = 'book_fs-big',
        fontSizeSmallClass = 'book_fs-small',
        fontsContainer = booksContainer.querySelector(`.${fontsContainerClass}`),
        activeFont = () => fontsContainer.querySelector(`.${activeFontClass}`);

    const colorsContainerClass = 'book__control_color',
        activeColorClass = 'color_active',
        grayColorClass = 'book_color-gray',
        whitesmokeColorClass = 'book_color-whitesmoke',
        blackColorClass = 'book_color-black',
        colorsContainer = booksContainer.querySelector(`.${colorsContainerClass}`),
        activeColor = () => colorsContainer.querySelector(`.${activeColorClass}`);

    const backgroundsContainerClass = 'book__control_background',
        activeBackgroundClass = 'color_active',
        grayBackgroundClass = 'book_bg-gray',
        whiteBackgroundClass = 'book_bg-white',
        blackBackgroundClass = 'book_bg-black',
        backgroundsContainer = booksContainer.querySelector(`.${backgroundsContainerClass}`),
        activeBackground = () => backgroundsContainer.querySelector(`.${activeBackgroundClass}`);

    handlers.click = (event) => {
        const fontSizeCtrl = (event) => {
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
            activeColor().classList.remove(activeColorClass);
            event.target.classList.add(activeColorClass);

            booksContainer.classList.remove(grayColorClass);
            booksContainer.classList.remove(whitesmokeColorClass);
            booksContainer.classList.remove(blackColorClass);

            if (event.target.className.includes('gray')) {
                booksContainer.classList.add(grayColorClass);
            }
            if (event.target.className.includes('whitesmoke')) {
                booksContainer.classList.add(whitesmokeColorClass);
            }
            if (event.target.className.includes('black')) {
                booksContainer.classList.add(blackColorClass);
            }
        }

        const backgroundCtrl = (event) => {
            activeBackground().classList.remove(activeBackgroundClass);
            event.target.classList.add(activeBackgroundClass);

            booksContainer.classList.remove(grayBackgroundClass);
            booksContainer.classList.remove(whiteBackgroundClass);
            booksContainer.classList.remove(blackBackgroundClass);

            if (event.target.className.includes('gray')) {
                booksContainer.classList.add(grayBackgroundClass);
            }
            if (event.target.className.includes('white')) {
                booksContainer.classList.add(whiteBackgroundClass);
            }
            if (event.target.className.includes('black')) {
                booksContainer.classList.add(blackBackgroundClass);
            }
        }
                        //    =====================================================

        const isCtrl = event.target.closest(`.${`book__controls`}`);

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

