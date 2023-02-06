// Домашнее задание к занятию 3.1 «Асинхронные запросы»
// Опрос с выбором результатов

let currentPoll = {answeredPoolsIDs: [], repeatsInRow: 0};

const URLGet = 'https://students.netoservices.ru/nestjs-backend/poll',
    URLPost = 'https://students.netoservices.ru/nestjs-backend/poll'
;
const answerButtonTemplate = (answer, id) => `
        <button class="poll__answer" data-id=${id}
                style="background-color: white;
                 color: black;
                 border: thin solid #666666;
                 border-radius: 15%">
            ${answer}
        </button>`;

const statAnswerButtonTemplate = (statAnswer) => `
        <div class="poll__answer stat__answer">${statAnswer['answer']}: 
            <span class="stat__answer__percent" style="font-weight: bold;"> ${statAnswer['votes']}%</span>
        </div>`;

const questionContainer = document.getElementById('poll__title'),
    answersContainer = document.getElementById('poll__answers'),
    clearAnswersContainer = () => answersContainer.querySelectorAll(`.poll__answer`).forEach(answer => answer.remove()),
    clearQuestion = () => questionContainer.textContent = '';

const setPollID = () => questionContainer.dataset.id = currentPoll.id,
    setPollStyle = (weight= 'bold', size= 22, font = 'Arial') => {
        questionContainer.style.fontFamily = font;
        questionContainer.style.fontWeight = weight;
        questionContainer.style.fontSize = size.toString();
    };

const stopPoll = () => clearAnswersContainer(),
    startPoll = (json) => {
        let poll = getPoll(json);
        const pollIsEmpty = !poll;
        if (pollIsEmpty) {
            if (currentPoll.repeatsInRow++ < 10) {
                startLoadPoll();
            } else {
                alert('Спасибо за Ваши ответы!\nОпрос окончен...')
            }
            return
        }
        currentPoll.repeatsInRow = 0;
        setPollID();
        setPollStyle();
        questionContainer.textContent = poll.question;
        poll.answers.forEach(answer => answersContainer.insertAdjacentHTML('beforeend',
            answerButtonTemplate(answer, poll.answers.indexOf(answer))));
        startPollButtonsHandler();
    };

const getPoll = (json) => {
        if (!json) { return undefined }
        const poll = JSON.parse(json);
        if (currentPoll.answeredPoolsIDs.includes(poll.id)) { return undefined }  // уже отвечал на этот вопрос
        currentPoll.id = poll.id;
        currentPoll.answeredPoolsIDs.push(poll.id);
        currentPoll.question = poll.data.title.trim();
        currentPoll.answers = poll.data.answers;
        return currentPoll ?? {};
};

const startRating = (json) => {
        const poll = getRating(json);
        poll.statAnswers.forEach(statAnswer => answersContainer.insertAdjacentHTML('beforeend',
            statAnswerButtonTemplate(statAnswer)));
        reloadPoll();
};

const getRating = (json) => {
        if (!json) { return {} }
        const poll = JSON.parse(json);
        currentPoll.statAnswers = poll['stat'];
        return currentPoll ?? {};
    };

const reloadPoll = () => {
        setTimeout( () => {
            clearAnswersContainer();
            clearQuestion();
            if (confirm('Отвечаем на вопросы?')) {
                startLoadPoll();
            }
        }, 2000);
};

function setPollHandlers() {
    let handlers = {}

    handlers.clickOnButtonAnswer = (event) => {
        if (!event.target.classList.contains('poll__answer')) {
            return }

        // if (event.defaultPrevented) return;
        // event.preventDefault();
        // event.stopPropagation();

        event.target.style.backgroundColor = 'royalblue'  // 'dodgerblue';
        event.target.style.color = 'white';

        setTimeout(() => {
            alert('Спасибо, Ваш вопрос засчитан!');
            stopPoll();
            startLoadPollRating(event.target.dataset.id);
        }, 200);
    }

    handlers.loadPoll = (event) => {
        const xhr = event.target;
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            startPoll(xhr.responseText);
        }
    }

    handlers.loadPollRating = (event) => {
        const xhr = event.target;
        if (xhr.readyState === xhr.DONE && xhr.status === 201) {
            startRating(xhr.responseText);
        }
    }

    handlers.loaderTransferFailed = (event) => alert("При загрузке файла произошла ошибка!");

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.poll = setPollHandlers();
    return handlers;
}

startPollButtonsHandler = () => answersContainer.addEventListener('click', myHandlers.poll.clickOnButtonAnswer);

startLoadPoll = () => {
    xhr.onreadystatechange = myHandlers.poll.loadPoll;
    xhr.onerror = myHandlers.poll.loaderTransferFailed;
    xhr.open('GET', URLGet, true);
    xhr.send();
}

startLoadPollRating = (answerID) => {
    xhr.onreadystatechange = myHandlers.poll.loadPollRating;
    xhr.onerror = myHandlers.poll.loaderTransferFailed;
    xhr.open('POST', URLPost);
    xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
    xhr.send( `vote=${questionContainer.dataset.id}&answer=${answerID}` );
}

function stopPollHandlers() {
    answersContainer.removeEventListener('click', myHandlers.poll.clickOnButtonAnswer);
}


const xhr = new XMLHttpRequest();
let myHandlers = setEventHandlers();

startLoadPoll();


