// Домашнее задание к занятию 2.2 «Работа с HTML-формами»
// Текстовый чат


let myHandlers = setEventHandlers();

function setChatEventHandlers() {
    let handlers = {currentMassage: ''};

    const chatContainerClass = `chat-widget`,
        chatContainer = document.body.querySelector(`.${chatContainerClass}`),
        chatActivationClass = 'chat-widget_active',
        isActiveChat = () => chatContainer.classList.contains(chatActivationClass),
        inputChatContainer = document.getElementById(`chat-widget__input`),
        messages = chatContainer.querySelector( '.chat-widget__messages' );

    inputChatContainer.setAttribute('minlength', '1');

    handlers.click = (event) => {
        const isChat = event.target.closest(`.${chatContainerClass}`),
            isSideWidget = event.target.closest(`.${'chat-widget__side'}`);

        if (!isChat) {
            return; }

        if (isSideWidget) {
            if (!isActiveChat()) {
                chatContainer.classList.add(chatActivationClass); }
            return;
        }
    }

    handlers.input = (event) => handlers.currentMassage = event.target.value.trim();

    handlers.keydown = (event) => {
        const isChatInput = () => event.target.closest(`input.${'chat-widget__input'}`),
            hasStopText = () => {
                for (let stopText of ['fuck']) {
                    if (myHandlers.chat.currentMassage.includes(stopText.toLowerCase())) {
                        return true; }
                }
                return false;
            },
            getRandServerMsg = () => {
                const phrases = [
                        'Hi!', 'By!', 'Ok', 'I don\'t care...', 'I don\'t understand...'
                    ],
                    index = Math.floor(Math.random() * phrases.length);
                return phrases[index];
            },
            getTime = () => new Date().toLocaleTimeString('ru', {hour: "2-digit", minute: "2-digit"});

        if (event.keyCode === 13 && isChatInput()) {
            document.activeElement.blur();

            if (inputChatContainer.checkValidity() && myHandlers.chat.currentMassage && !hasStopText()) {
                messages.innerHTML += `
                  <div class="message message_client">
                    <div class="message__time">${getTime()}</div>
                    <div class="message__text">
                      ${myHandlers.chat.currentMassage}
                    </div>
                  </div>
                `;
                messages.innerHTML += `
                  <div class="message">
                    <div class="message__time">${getTime()}</div>
                    <div class="message__text">
                      ${getRandServerMsg()}
                    </div>
                  </div>
                `;
            }
            event.target.value = '';
            handlers.currentMassage = '';

            event.target.focus();
        }
    }

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.chat = setChatEventHandlers();
    return handlers;
}

function startHandlers() {
    document.addEventListener('click', myHandlers.chat.click);
    document.addEventListener('input', myHandlers.chat.input);
    document.addEventListener('keydown', myHandlers.chat.keydown);
}

function stopHandlers() {
    document.removeEventListener('click', myHandlers.chat.click);
    document.removeEventListener('input', myHandlers.chat.input);
    document.removeEventListener('keydown', myHandlers.chat.keydown);
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

