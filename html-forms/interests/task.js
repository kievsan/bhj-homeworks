// Домашнее задание к занятию 2.2 «Работа с HTML-формами»
// Дерево интересов


let myHandlers = setEventHandlers();

function setCheckboxEventHandlers() {
    let handlers = {};

    const mainCheckboxContainer = (checkbox) => checkbox.closest(`.interests.interests_main`),
        currentContainer = (checkbox) => checkbox.closest(`.interest`),
        childrenContainer = (checkbox) => currentContainer(checkbox).querySelector(`.interests.interests_active`),
        siblingsContainer = (checkbox) => checkbox.closest(`.interests`) === mainCheckboxContainer(checkbox)
                ? checkbox.closest(`.interests ul`) : checkbox.closest(`.interests`),
        parentContainer = (checkbox) => siblingsContainer(checkbox).closest(`.interest`)
    ;
    const getCheckboxes = (containerFunc, checkbox) => {
            let checkboxes = [];
            const containers = containerFunc(checkbox) ? containerFunc(checkbox).children : [];
            [...containers].forEach((container) => checkboxes.push(container.querySelector(`input.interest__check`)));
            return checkboxes;
        },
        siblings = (checkbox) => getCheckboxes(siblingsContainer, checkbox),
        children = (checkbox) => getCheckboxes(childrenContainer, checkbox),
        parent = (checkbox) => parentContainer(checkbox) ? parentContainer(checkbox).querySelector(`input.interest__check`) : null
    ;
    const isFullChecked = (checkboxes) => {
            let isChecked = true;
            checkboxes.forEach((checkbox) => isChecked = isChecked && checkbox.checked);
            return isChecked;
        },
        hasNoChecked = (checkboxes) => {
            let isChecked = false;
            checkboxes.forEach((checkbox) => isChecked = isChecked || checkbox.checked);
            return !isChecked;
        }

    handlers.click = (event) => {
        const isCheckbox = event.target.closest(`input.interest__check`);
        if (!isCheckbox || !mainCheckboxContainer(event.target)) {
            return }

        const Checkbox = event.target;
        // let currentSiblings = siblings(Checkbox), currentChildren = children(Checkbox), currentParent = parent(Checkbox);

        const manageSimpleCheckboxes = (current = Checkbox) => {
            children(current).forEach((checkbox) => {
                checkbox.checked = current.checked;
                checkbox.indeterminate = false;
            });
            if (parent(current)) {
                parent(current).checked = isFullChecked(siblings(current));
                parent(current).indeterminate = !isFullChecked(siblings(current)) && !hasNoChecked(siblings(current)); }
        }

        manageSimpleCheckboxes();
    }
    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.checkbox = setCheckboxEventHandlers();
    return handlers;
}

function startHandlers() {
    document.addEventListener('click', myHandlers.checkbox.click);
}

function stopHandlers() {
    document.removeEventListener('click', myHandlers.checkbox.click);
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





// (Rotate) Indeterminate Checkboxes
// function ts(cb) {
//     if (cb.readOnly) cb.checked=cb.readOnly=false;
//     else if (!cb.checked) cb.readOnly=cb.indeterminate=true;
// }


