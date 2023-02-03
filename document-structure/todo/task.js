// Домашнее задание к занятию 2.3 «Изменение структуры HTML-документа».
// Простой список дел

const todoList = {
    classes: {
        container: 'tasks',
        task: 'task',
        title: 'task__title',
        list: 'tasks__list',
        delete: 'task__remove'
    },
    html: {
        container: document.getElementById('tasks'),
        form: document.getElementById('tasks__form'),
        input: document.getElementById('task__input'),
        button: document.getElementById('tasks__add'),
        list: document.getElementById('tasks__list'),
        tasksTemplate: (taskText) => `
         <div class=${todoList.classes.task}>
             <div class=${todoList.classes.title}>
                ${taskText}
             </div>
              <a href="#" class=${todoList.classes.delete}>&times;</a>
         </div>`
    },
    add: (taskText) => {
        todoList.html.list.insertAdjacentHTML('afterbegin',todoList.html.tasksTemplate(taskText));
        const removeWidget = todoList.html.list.firstElementChild.querySelector(`a.${todoList.classes.delete}`);
        removeWidget.onclick = myHandlers.task.removeTaskByClick;
    }
}

function setTaskEventHandlers() {
    let handlers = { currentTaskText: '' }

    handlers.removeTaskByClick = (event) => {
        const currentTask = event.target.closest(`.${todoList.classes.task}`);
        currentTask.remove();
        event.preventDefault();
        // event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);  // остановить всплытие
    }

    handlers.input = (event) => {
        handlers.currentTaskText = event.target.value
            ? event.target.value.trim() : '';  // Текст текущей задачи
        event.preventDefault();
    }

    handlers.clickOnButtonAdd = (event) => {
        // блокировать ввод
        document.activeElement.blur();
        // при наличии текста в поле ввода
        if (handlers.currentTaskText) {
            // Добавить Строку с текстом задачи
            todoList.add(handlers.currentTaskText);
        }
        // input reset
        todoList.html.input.value = '';
        handlers.currentTaskText = '';
        // разблокировать ввод
        todoList.html.input.focus();
        // отменить действие по умолчанию
        event.preventDefault();
    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.task = setTaskEventHandlers();
    return handlers;
}

function startHandlers() {
    todoList.html.button.addEventListener('click', myHandlers.task.clickOnButtonAdd);
    document.addEventListener('input', myHandlers.task.input);
    document.addEventListener('keydown', myHandlers.task.keydown);
}

function stopHandlers() {
    todoList.html.button.removeEventListener('click', myHandlers.task.clickOnButtonAdd);
    document.removeEventListener('input', myHandlers.task.input);
    document.removeEventListener('keydown', myHandlers.task.keydown);
}


let myHandlers = setEventHandlers();
startHandlers();
