// Домашнее задание к занятию 2.1 «DOM».
// Задание 2. Ротатор рекламы


function rotator(containerSelector = rotatorsContainerSelector) {
    for (let currentRotator of getRotators(containerSelector)) {
        let delay = 4, current, rotator, intervalID,
            start = new Date().getTime();

        intervalID = setInterval(() => {
            if (rotator) {
                if (new Date().getTime() - start < delay) {
                    delay = delay - (new Date().getTime() - start);
                } else {
                    start = new Date().getTime();
                    current = activateNextItem(rotator);
                }
            } else {
                rotator = currentRotator;
                current = activeItemOfRotator(rotator);
                current.style.color = current.dataset.color;
            }
            delay = current.dataset.speed;
            delay = correctValue(delay);
            delay = delay < 0 ? 0 : delay;
        }, delay);
    }
}

function rotator2(containerSelector = rotatorsContainerSelector) {
    let delay, start, current, rotator, intervalID;

    let startRotator = (currentRotator) => {
        rotator = intervalID ? rotator : currentRotator;
        current = intervalID ? activateNextItem(rotator) : activeItemOfRotator(rotator);
        intervalID ? clearInterval(intervalID) : current.style.color = current.dataset.color;

        delay = current.dataset.speed;
        delay = correctValue(delay);
        delay = delay < 0 ? 0 : delay;

        intervalID = setTimeout(startRotator, delay);
    }

    for (let rotator of getRotators(containerSelector)) {
        intervalID = 0;
        startRotator(rotator);
    }
}


const rotatorsContainerSelector = 'main.content',
    rotatorClass = 'rotator',
    rotatorItemClass = 'rotator__case',
    activationClass = 'rotator__case_active',
    getRotators = (containerSelector) => document.querySelector(containerSelector).querySelectorAll(`.${rotatorClass}`),
    isActiveItem = (item) => item ? item.classList.contains(activationClass) : false,
    activeItemOfRotator = (rotator) => rotator ? rotator.querySelector(`.${activationClass}`) : null,
    nextItem = (rotator) => {
        if (rotator) {
            const lastItemChild = rotator.lastElementChild,
                activeItem = activeItemOfRotator(rotator);
            return activeItem === lastItemChild ? rotator.firstElementChild : activeItem.nextElementSibling;
        }
        return null;
    },
    deactivateItemOfRotator = (rotator) => activeItemOfRotator(rotator).classList.remove(activationClass),
    activateNextItem = (rotator) => {
        const next = nextItem(rotator);
        deactivateItemOfRotator(rotator);
        if (next && !isActiveItem(next)) {
            next.classList.add(activationClass);
            next.style.color = next.dataset.color; }
        return next;
    },
    correctValue = (value) => {
        value = value ? Math.abs(parseInt(value)) : 4;
        return value ? value  : 4;
    }

// rotator();  // Ok

rotator2();  // Ok

