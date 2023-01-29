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
    ;

    handlers.change = (event) => {
        const manageSimpleCheckboxes = (Checkbox = event.target) => {
            children(Checkbox).forEach((checkbox) => {
                checkbox.checked = Checkbox.checked;
                checkbox.indeterminate = false;
            });
            if (parent(Checkbox)) {
                parent(Checkbox).checked = isFullChecked(siblings(Checkbox));
                parent(Checkbox).indeterminate = !isFullChecked(siblings(Checkbox)) && !hasNoChecked(siblings(Checkbox));
            }
        }

        const manageCheckboxes = (Checkbox = event.target) => {
            const checkChildren = (current) => {
                if (children(current)) {
                    children(current).forEach((checkbox) => {
                        checkbox.checked = current.checked;
                        checkbox.indeterminate = false;
                        checkChildren(checkbox);
                    });
                }
            }
            const checkParent = (current) => {
                let checkbox = parent(current);
                if (checkbox) {
                    checkbox.checked = isFullChecked(siblings(current));
                    checkbox.indeterminate = !isFullChecked(siblings(current)) && !hasNoChecked(siblings(current));
                    checkParent(checkbox);
                }
            }

            checkChildren(Checkbox);
            checkParent(Checkbox);
        }

        // manageSimpleCheckboxes();
        manageCheckboxes();
    }
    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.checkbox = setCheckboxEventHandlers();
    return handlers;
}

function startHandlers() { document.addEventListener('change', myHandlers.checkbox.change); }

function stopHandlers() { document.removeEventListener('change', myHandlers.checkbox.change); }


startHandlers();
