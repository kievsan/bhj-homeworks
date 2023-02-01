// Домашнее задание к занятию 2.3 «Изменение структуры HTML-документа».
// Простой список дел

class ToDoList {
    static classes = {
        container: 'tasks',
        task: 'task',
        title: 'task__title',
        list: 'tasks__list',
        delete: 'task__remove'
    }
    static ID = {
        container: 'tasks',
        list: 'tasks__list',
        form: 'tasks__form'
    }
    static taskHtmlTemplate = (taskText) => `
         <div class=${ToDoList.classes.task}>
             <div class=${ToDoList.classes.title}>
                ${taskText}
             </div>
              <a href="#" class=${ToDoList.classes.delete}>&times;</a>
         </div>`;

    constructor() {
        this.html = document.getElementById(ToDoList.ID.list);
    }

    add = (taskText) => {
        this.html.insertAdjacentHTML('afterbegin',ToDoList.taskHtmlTemplate(taskText));
        clearInterval(myHandlers.task.intervalID);
    }

    del = (element) => element.remove();

}

function setTaskEventHandlers() {
    let handlers = {
        todoList: new ToDoList(),
        currentTaskText: '',
        intervalID: 0
    }

    handlers.click = (event) => {
        const isRemovingWidget = event.target.className === ToDoList.classes.delete,
            isInput = event.target.closest(`input.task__input`),
            isTasks = event.target.closest(`.${ToDoList.classes.container}`);

        if (!isTasks) {
            return; }

        if (isInput) {
            event.target.focus();
        }

        if (isRemovingWidget) {
            myHandlers.task.todoList.del(event.target);
            return;
        }

        event.preventDefault();
    }

    handlers.input = (event) => {
        myHandlers.task.currentTaskText = event.target.value
            ? event.target.value.trim() : '';  // Текст текущей задачи

        event.preventDefault();
    }

    handlers.keydown = (event) => {
        const isTaskInput = () => event.target.closest(`input.${'tasks__input'}`);
        // Нажата клавиша Enter
        if (event.keyCode === 13 && isTaskInput()) {
            // блокировать ввод
            document.activeElement.blur();
            // при наличии текста в поле ввода
            if (myHandlers.task.currentTaskText) {
                // Добавить Строку с текстом задачи
                myHandlers.task.todoList.add(myHandlers.task.currentTaskText);
            }
            // input reset
            event.target.value = '';
            handlers.currentTaskText = '';
            // разблокировать ввод
            event.target.focus();
        }
    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.task = setTaskEventHandlers();
    return handlers;
}

function startHandlers() {
    document.addEventListener('click', myHandlers.task.input);
    document.addEventListener('input', myHandlers.task.input);
    document.addEventListener('keydown', myHandlers.task.keydown);
}

function stopHandlers() {
    document.removeEventListener('click', myHandlers.task.input);
    document.removeEventListener('input', myHandlers.task.input);
    document.removeEventListener('keydown', myHandlers.task.keydown);
}


let myHandlers = setEventHandlers();
startHandlers();
