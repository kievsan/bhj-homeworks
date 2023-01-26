// Домашнее задание к занятию 2.1 «DOM».
// Задание 2. Ротатор рекламы


timerStop = (intervalID) => {
    clearInterval(intervalID);
    alert('Вы победили в конкурсе');
}

function startRotator(delay = 1000, startDelay = 1000) {
    delay = correctValue(delay);
    startDelay = correctValue(startDelay);
    let currentDelay = startDelay;

    let intervalID = setInterval(() => {
        let startTime = new Date().getTime();

        let activatedItems = activatedRotatorItems(document.querySelector('main.content'));
        activateNextRotatorItems(activatedItems);
        deactivateRotatorItems(activatedItems);

        currentDelay = delay - (new Date().getTime() - startTime);
    }, currentDelay);
}

function startRotator2(delay = 1000, startDelay = 1000) {
    delay = correctValue(delay);
    startDelay = correctValue(startDelay);
    let currentDelay = startDelay;
    let intervalID;

    let rotator = function () {
        let startTime = new Date().getTime();

        let activatedItems = activatedRotatorItems(document.querySelector('main.content'));
        activateNextRotatorItems(activatedItems);
        deactivateRotatorItems(activatedItems);
        
        currentDelay = delay - (new Date().getTime() - startTime);
        intervalID = setTimeout(rotator, currentDelay);
    }.bind(this);

    rotator();
}


const rotatorClass = 'rotator',
    rotatorItemClass = 'rotator__case',
    activationClass = 'rotator__case_active',
    isActiveItem = (item) => item ? item.classList.contains(activationClass) : false,
    rotatorForItem = (item) => item ? item.closest(`.${rotatorClass}`) : null,
    nextItemInRotator = (item) => {
        const rotator = item ? rotatorForItem(item) : null;
        if (rotator) {
            const lastElChild = rotator.lastElementChild;
            return item === lastElChild ? rotator.firstElementChild : item.nextElementSibling; }
        return null;
    },
    activatedRotatorItems = (container) => container.querySelectorAll(`.${rotatorItemClass}.${activationClass}`),
    deactivateRotatorItems = (items) => {for(let item of items) {item.classList.remove(activationClass)}},
    activateNextRotatorItems = (items) => {
        for(let item of items) {
            const nextItem = nextItemInRotator(item);
            if (nextItem && !isActiveItem(nextItem)) {
                nextItem.classList.add(activationClass); }
        }
    },
    correctValue = (value) => Math.abs(parseInt(value)) ? Math.abs(parseInt(value)) : 4;

// startRotator();
startRotator2();

